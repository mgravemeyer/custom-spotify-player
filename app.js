window.onSpotifyWebPlaybackSDKReady = () => {

    const token = 'YOUR TOKEN'

    const player = new Spotify.Player({
        name: 'Web Playback',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);

        player.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            console.log(state);

            var current_track = state.track_window.current_track;
            var next_track = state.track_window.next_tracks[0];

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
        });
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('player_state_changed', ({ track_window: { current_track } }) => {
        document.getElementById("album-cover").src=current_track.album.images[2].url;
    });

    $isPause = true;

    player.connect();

    document.getElementById('togglePlayPause').onclick = function() {
        player.togglePlay().then(() => {

            if($isPause) {
                document.getElementById("togglePlayPause").src='./icons/pause.png';
            } else {
                document.getElementById("togglePlayPause").src='./icons/play.png';
            }

            $isPause = !$isPause;

            console.log('play');
        })
    };

    document.getElementById('toggleNext').onclick = function() {
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
        });
    };

    document.getElementById('togglePrev').onclick = function() {
        player.previousTrack().then(() => {
            console.log('Set to previous track!');
        });
    };

};