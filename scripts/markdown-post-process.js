/**
 * Materialis - Markdown 语法增强
 * 不依赖额外 Hexo 插件，通过过滤器实现：
 *   1. ==高亮==   → <mark>高亮</mark>
 *   2. $公式$     → 保护数学公式，防止 marked 破坏
 *   3. :emoji:    → Unicode Emoji 转换
 *
 * 关键设计：
 *   - 高亮和 Emoji 在 before_post_render 阶段处理（避免匹配 <code> 内的 HTML）
 *   - 数学公式在 before_post_render 保护 → after_post_render 恢复为 KaTeX 容器
 */

'use strict';

// ========== Emoji 短代码映射表 ==========
const EMOJI_MAP = {
    // 表情
    ':smile:': '😄', ':laughing:': '😆', ':blush:': '😊', ':smiley:': '😃',
    ':relaxed:': '☺️', ':smirk:': '😏', ':heart_eyes:': '😍', ':kissing_heart:': '😘',
    ':wink:': '😉', ':grin:': '😁', ':joy:': '😂', ':sob:': '😭',
    ':angry:': '😠', ':rage:': '😡', ':triumph:': '😤', ':disappointed:': '😞',
    ':confused:': '😕', ':neutral_face:': '😐', ':expressionless:': '😑',
    ':stuck_out_tongue:': '😛', ':stuck_out_tongue_winking_eye:': '😜',
    ':stuck_out_tongue_closed_eyes:': '😝', ':sleeping:': '😴', ':worried:': '😟',
    ':frowning:': '😦', ':anguished:': '😧', ':grimacing:': '😬',
    ':open_mouth:': '😮', ':hushed:': '😯', ':cold_sweat:': '😰',
    ':scream:': '😱', ':astonished:': '😲', ':flushed:': '😳',
    ':sleepy:': '😪', ':dizzy_face:': '😵', ':mask:': '😷',
    ':sunglasses:': '😎', ':nerd:': '🤓', ':thinking:': '🤔',
    ':zipper_mouth:': '🤐', ':rolling_eyes:': '🙄', ':slight_smile:': '🙂',
    ':upside_down:': '🙃', ':hugging:': '🤗', ':clown:': '🤡',
    ':drooling:': '🤤', ':puke:': '🤮', ':sneezing:': '🤧',
    ':cowboy:': '🤠', ':shushing:': '🤫', ':hand_over_mouth:': '🤭',
    ':yawning:': '🥱', ':partying:': '🥳', ':pleading:': '🥺',
    ':exploding_head:': '🤯', ':hot_face:': '🥵', ':cold_face:': '🥶',
    // 手势
    ':thumbsup:': '👍', ':thumbsdown:': '👎', ':ok_hand:': '👌',
    ':punch:': '👊', ':fist:': '✊', ':v:': '✌️', ':wave:': '👋',
    ':raised_hand:': '✋', ':clap:': '👏', ':pray:': '🙏',
    ':muscle:': '💪', ':point_up:': '☝️', ':point_down:': '👇',
    ':point_left:': '👈', ':point_right:': '👉', ':middle_finger:': '🖕',
    ':raised_hands:': '🙌', ':writing_hand:': '✍️',
    // 爱心 / 符号
    ':heart:': '❤️', ':blue_heart:': '💙', ':green_heart:': '💚',
    ':yellow_heart:': '💛', ':purple_heart:': '💜', ':black_heart:': '🖤',
    ':broken_heart:': '💔', ':heartbeat:': '💓', ':sparkling_heart:': '💖',
    ':two_hearts:': '💕', ':star:': '⭐', ':star2:': '🌟',
    ':sparkles:': '✨', ':zap:': '⚡', ':boom:': '💥',
    ':fire:': '🔥', ':tada:': '🎉', ':confetti:': '🎊',
    ':ribbon:': '🎀', ':gift:': '🎁', ':100:': '💯',
    ':exclamation:': '❗', ':question:': '❓', ':grey_exclamation:': '❕',
    ':grey_question:': '❔', ':bulb:': '💡', ':warning:': '⚠️',
    ':no_entry:': '⛔', ':white_check_mark:': '✅', ':x:': '❌',
    ':heavy_check_mark:': '✔️', ':heavy_plus_sign:': '➕', ':heavy_minus_sign:': '➖',
    // 物品 / 技术
    ':rocket:': '🚀', ':computer:': '💻', ':package:': '📦',
    ':books:': '📚', ':book:': '📖', ':memo:': '📝',
    ':pencil2:': '✏️', ':pushpin:': '📌', ':paperclip:': '📎',
    ':calendar:': '📅', ':clock:': '🕐', ':mag:': '🔍',
    ':key:': '🔑', ':lock:': '🔒', ':unlock:': '🔓',
    ':wrench:': '🔧', ':hammer:': '🔨', ':link:': '🔗',
    ':email:': '📧', ':phone:': '📞', ':camera:': '📷',
    ':movie_camera:': '🎥', ':headphones:': '🎧', ':microphone:': '🎤',
    ':tv:': '📺', ':radio:': '📻', ':battery:': '🔋',
    ':art:': '🎨', ':musical_note:': '🎵', ':notes:': '🎶',
    ':game_die:': '🎲', ':trophy:': '🏆', ':medal:': '🏅',
    ':crown:': '👑', ':gem:': '💎', ':rainbow:': '🌈',
    ':sunny:': '☀️', ':cloud:': '☁️', ':umbrella:': '☂️',
    ':snowflake:': '❄️', ':ocean:': '🌊',
    ':earth_africa:': '🌍', ':earth_americas:': '🌎', ':earth_asia:': '🌏',
    ':moon:': '🌙', ':new_moon:': '🌑', ':full_moon:': '🌕',
    // 食物
    ':apple:': '🍎', ':pizza:': '🍕', ':coffee:': '☕',
    ':tea:': '🍵', ':beer:': '🍺', ':wine:': '🍷',
    ':cake:': '🍰', ':cookie:': '🍪', ':hamburger:': '🍔',
    ':watermelon:': '🍉', ':banana:': '🍌', ':cherries:': '🍒',
    // 动物
    ':cat:': '🐱', ':dog:': '🐶', ':unicorn:': '🦄',
    ':bird:': '🐦', ':penguin:': '🐧', ':butterfly:': '🦋',
    ':bee:': '🐝', ':whale:': '🐳', ':octopus:': '🐙',
    ':turtle:': '🐢',
    // 箭头 / 导航
    ':arrow_up:': '⬆️', ':arrow_down:': '⬇️', ':arrow_left:': '⬅️',
    ':arrow_right:': '➡️', ':arrow_forward:': '▶️', ':arrow_backward:': '◀️',
    ':recycle:': '♻️', ':checkered_flag:': '🏁',
};

// ========== 工具函数 ==========
function replaceEmoji(text) {
    return text.replace(/:[\w+-]+:/g, function (match) {
        return EMOJI_MAP[match] || match;
    });
}

function replaceHighlight(text) {
    return text.replace(/==(.+?)==/g, '<mark>$1</mark>');
}

// ========== before_post_render: 保护数学公式 + 处理高亮/Emoji ==========
hexo.extend.filter.register('before_post_render', function (data) {
    if (!data || !data.content) return data;

    var content = data.content;
    var blocks = [];
    var inlines = [];

    // 1. 保护代码块和行内代码（避免处理其中的内容）
    var codeBlocks = [];
    content = content.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, function (match) {
        codeBlocks.push(match);
        return '<!--CODE_' + (codeBlocks.length - 1) + '-->';
    });

    // 2. 高亮 ==text== → <mark>text</mark>（在 markdown 源文本阶段处理，marked 会将其作为 inline HTML 保留）
    content = replaceHighlight(content);

    // 3. Emoji 短代码 :emoji: → Unicode
    content = replaceEmoji(content);

    // 4. 保护块级数学公式 $$...$$
    content = content.replace(/\$\$([\s\S]*?)\$\$/g, function (match, formula) {
        blocks.push(formula.trim());
        return '<--MATH_BLOCK_' + (blocks.length - 1) + '-->';
    });

    // 5. 保护行内数学公式 $...$（不跨越换行，跳过货币数字如 $100）
    content = content.replace(/\$(.+?)\$/g, function (match, formula) {
        if (/^\d/.test(formula)) return match;
        inlines.push(formula.trim());
        return '<--MATH_INLINE_' + (inlines.length - 1) + '-->';
    });

    // 6. 恢复代码块
    content = content.replace(/<!--CODE_(\d+)-->/g, function (match, index) {
        return codeBlocks[parseInt(index)];
    });

    data.content = content;
    data._mathBlocks = blocks;
    data._mathInlines = inlines;

    return data;
});

// ========== after_post_render: 恢复数学公式为 KaTeX 容器 ==========
hexo.extend.filter.register('after_post_render', function (data) {
    if (!data || !data.content) return data;

    var content = data.content;

    // 1. 恢复块级数学公式
    if (data._mathBlocks && data._mathBlocks.length > 0) {
        data._mathBlocks.forEach(function (formula, i) {
            var escaped = formula
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            content = content.replace(
                '<--MATH_BLOCK_' + i + '-->',
                '<div class="katex-block">' + escaped + '</div>'
            );
        });
    }

    // 2. 恢复行内数学公式
    if (data._mathInlines && data._mathInlines.length > 0) {
        data._mathInlines.forEach(function (formula, i) {
            var escaped = formula
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            content = content.replace(
                '<--MATH_INLINE_' + i + '-->',
                '<span class="katex-inline">' + escaped + '</span>'
            );
        });
    }

    data.content = content;
    return data;
});
