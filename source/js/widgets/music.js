// 音乐球播放逻辑（网易云外链 + 可选自建 NeteaseCloudMusicApi）
(function () {
    var cfg = window.MUSIC_CONFIG;
    if (!cfg) return;

    var widget = document.getElementById('music-widget');
    if (!widget) return;

    var ball = document.getElementById('music-ball');
    var ballCover = document.getElementById('music-ball-cover');
    var panelCover = document.getElementById('music-panel-cover');
    var titleEl = document.getElementById('music-panel-title');
    var artistEl = document.getElementById('music-panel-artist');
    var slider = document.getElementById('music-slider');
    var currentEl = document.getElementById('music-current');
    var durationEl = document.getElementById('music-duration');
    var playBtn = document.getElementById('music-play');
    var playIcon = document.getElementById('music-play-icon');
    var prevBtn = document.getElementById('music-prev');
    var nextBtn = document.getElementById('music-next');
    var closeBtn = document.getElementById('music-close');
    var audio = document.getElementById('music-audio');

    var songs = [];
    var index = 0;
    var seeking = false;
    var inited = false;

    // 网易云官方外链（免后端，直接返回 mp3 重定向）
    function outerUrl(id) {
        return 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3';
    }

    function fmt(t) {
        t = Math.max(0, Math.floor(t || 0));
        var m = Math.floor(t / 60);
        var s = t % 60;
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function setCover(el, url) {
        if (url) {
            el.style.backgroundImage = 'url("' + url + '")';
            el.innerHTML = '';
        } else {
            el.style.backgroundImage = '';
            if (!el.querySelector('material-icon')) {
                el.innerHTML = '<material-icon name="music_note"></material-icon>';
            }
        }
    }

    function loadSong(i, autoplay) {
        if (!songs.length) return;
        index = (i + songs.length) % songs.length;
        var s = songs[index];
        titleEl.textContent = s.name || '未知曲目';
        artistEl.textContent = s.artist || '- -';
        setCover(ballCover, s.cover);
        setCover(panelCover, s.cover);

        audio.src = s.url || outerUrl(s.id);
        audio.load();

        if (slider) slider.value = 0;
        currentEl.textContent = '0:00';
        durationEl.textContent = '0:00';

        if (autoplay) play();
    }

    function play() {
        var p = audio.play();
        if (p && p.catch) {
            p.catch(function () {
                // 自动播放被浏览器拦截，等待用户再次点击
                updatePlayUI();
            });
        }
    }

    function pause() {
        audio.pause();
    }

    function updatePlayUI() {
        if (audio.paused) {
            playIcon.name = 'play_arrow';
            ball.classList.remove('playing');
        } else {
            playIcon.name = 'pause';
            ball.classList.add('playing');
        }
    }

    function next() { loadSong(index + 1, true); }
    function prev() {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        loadSong(index - 1, true);
    }

    // —— 事件绑定 ——
    ball.addEventListener('click', function () {
        widget.classList.toggle('expanded');
        // 首次展开时加载并尝试播放
        if (widget.classList.contains('expanded') && !inited) {
            inited = true;
            loadSong(index, true);
        }
    });

    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        widget.classList.remove('expanded');
    });

    playBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!inited) { inited = true; loadSong(index, true); return; }
        if (audio.paused) play(); else pause();
    });

    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });

    audio.addEventListener('play', updatePlayUI);
    audio.addEventListener('pause', updatePlayUI);
    audio.addEventListener('ended', next);
    audio.addEventListener('loadedmetadata', function () {
        durationEl.textContent = fmt(audio.duration);
        if (slider && audio.duration) slider.max = Math.floor(audio.duration);
    });
    audio.addEventListener('timeupdate', function () {
        if (!seeking) {
            currentEl.textContent = fmt(audio.currentTime);
            if (slider && audio.duration) slider.value = Math.floor(audio.currentTime);
        }
    });
    audio.addEventListener('error', function () {
        // 加载失败（如 VIP 歌曲）时提示
        titleEl.textContent = (songs[index] && songs[index].name) || '播放失败';
        artistEl.textContent = '该歌曲可能需要 VIP 或无版权';
    });

    // 滑块拖动
    if (slider) {
        slider.addEventListener('input', function () {
            seeking = true;
            currentEl.textContent = fmt(parseFloat(slider.value));
        });
        slider.addEventListener('change', function () {
            audio.currentTime = parseFloat(slider.value);
            seeking = false;
        });
    }

    // —— 数据加载 ——
    function initWithPlaylist(list) {
        songs = (list || []).filter(function (s) { return s && s.id; });
        if (songs.length) loadSong(0, false);
    }

    function fetchFromApi() {
        var api = String(cfg.api || '').replace(/\/+$/, '');
        var pid = cfg.playlistId;
        if (!api || !pid) return false;

        fetch(api + '/playlist/detail?id=' + pid)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var tracks = (data && data.playlist && data.playlist.tracks) || [];
                if (!tracks.length) { initWithPlaylist(cfg.playlist); return; }
                songs = tracks.map(function (t) {
                    var artists = t.ar || t.artists || [];
                    return {
                        id: t.id,
                        name: t.name,
                        artist: artists.map(function (a) { return a.name; }).join(' / '),
                        cover: (t.al && (t.al.picUrl || t.al.pic_str)) || ''
                    };
                });
                loadSong(0, false);
            })
            .catch(function () {
                // API 不可用时回退到配置 playlist
                initWithPlaylist(cfg.playlist);
            });
        return true;
    }

    // 初始化
    if (cfg.api && cfg.playlistId) {
        if (!fetchFromApi()) initWithPlaylist(cfg.playlist);
    } else {
        initWithPlaylist(cfg.playlist);
    }
})();
