export const creteZoomControl = (map) => {

    const zoomInButton = document.createElement('button');
    const plusIcon = document.createElement('img');
    plusIcon.src = 'plus.png';
    zoomInButton.appendChild(plusIcon);
    zoomInButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in';
    zoomInButton.addEventListener('click', () => {
        map.current.zoomIn();
    });

    const zoomOutButton = document.createElement('button');
    const minusIcon = document.createElement('img');
    minusIcon.src = 'minus.png';
    zoomOutButton.appendChild(minusIcon);
    zoomOutButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out';
    zoomOutButton.addEventListener('click', () => {
        map.current.zoomOut();
    });

    const zoomControls = document.createElement('div');
    zoomControls.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

    zoomControls.appendChild(zoomInButton);
    zoomControls.appendChild(zoomOutButton);
    map.current.getContainer().querySelector('.mapboxgl-ctrl-bottom-right').appendChild(zoomControls);

}