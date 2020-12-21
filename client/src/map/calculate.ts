function rad(degrees: number) {
    return degrees * Math.PI / 180
}

function deg(radians: number) {
    return radians * 180 / Math.PI;
}

function normalizeLatitude(point: { lon: number, lat: number }) {
    if (Math.abs(point.lat) > rad(90)) {
        // @ts-ignore
        point.lat = rad(180) - point.lat - 2 * rad(180) * (point.lat < -rad(90));
        point.lon = normalizeLongitude(point.lon - rad(180));
    }
    return point;
}

function normalizeLongitude(lon: number) {
    var n = Math.PI;
    if (lon > n) {
        lon = lon - 2 * n
    } else if (lon < -n) {
        lon = lon + 2 * n
    }
    return lon;
}

export function calculate(p: { longitude?: number, latitude?: number }[]) {

    let parlat = 0,parlng = 0
    let par = 0;
    let cI =1;
    let midlat = 0, midlng = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let x1, y1, z1;
    let pt = {lat: 0, lon: 0}
    let lats1 = [];
    let lons1 = [];
    let sinlats = [];
    let coslats = [];
    let hyp;

    if(p.length === 0) return
    // iterate over the points
    for (let i = 0; i < p.length; i++) {
       const point =  p[i]
        if(!point.latitude || !point.longitude)continue;

        lats1[i] = rad(point.latitude);
        lons1[i] = rad(point.longitude);
        sinlats[i] = Math.sin(lats1[i]);
        coslats[i] = Math.cos(lats1[i]);
        x1 = coslats[i] * Math.cos(lons1[i]);
        y1 = coslats[i] * Math.sin(lons1[i]);
        z1 = sinlats[i];
        x += x1;
        y += y1;
        z += z1;
    }
    midlng = Math.atan2(y, x);
    hyp = Math.sqrt(x * x + y * y);
    midlat = Math.atan2(z, hyp);

    //what is ci?
    if (cI !== 2 && Math.abs(x) < 1.0e-9 && Math.abs(y) < 1.0e-9 && Math.abs(z) < 1.0e-9) {
        // if (MM) MM = remove(MM);
        console.log('The midpoint is the center of the earth.');
    } else {
        if (cI === 2) {
            y = 0;
            x = 0;
            for (let i = 0; i < lats1.length; i++) {
                y = y + lats1[i];
                x = x + normalizeLongitude(lons1[i] - midlng);
            }
            midlat = y;
            midlng = normalizeLongitude(x + midlng);
        } else if (cI === 1) {
            if (lats1.length >= 2) {
                let tries = 0;
                lats1[lats1.length] = midlat;
                lons1[lons1.length] = midlng;
                let distrad = rad(90);
                let mindist = 1.0e07;
                let sum = 0;
                let gMindist = 0;
                let lat2, slat, cdist
                let minlat = 0
                let minlon = 0;
                let t = [8, 6, 7, 2, 0, 1, 5, 3, 4];
                let scale = [0.7071, 0.7071, 1, 0.7071, 0.7071, 1, 1, 1, 1];
                let testcenter = true;
                let i = lats1.length + 8;
                while (distrad > 2.0e-08 && tries < 5000) {
                    if (i < 0) {
                        i = 8;
                    }
                    while (i >= 0) {
                        if (i < 9) {
                            y = Math.floor(t[i] / 3) - 1;
                            x = t[i] % 3;
                            switch (x) {
                                case 1:
                                    pt.lon = midlng;
                                    pt.lat = midlat - y * distrad;
                                    pt = normalizeLatitude(pt);
                                    break
                                case 0:
                                    pt.lon = midlng;
                                    pt.lat = midlat - y * distrad * scale[i];
                                    pt = normalizeLatitude(pt);
                                    lat2 = pt.lat;
                                    slat = Math.sin(lat2);
                                    cdist = Math.cos(distrad * scale[i]);
                                    pt.lat = Math.asin(slat * cdist);
                                    pt.lon = normalizeLongitude(pt.lon + Math.atan2(-Math.sin(distrad * scale[i]) * Math.cos(lat2), cdist - slat * Math.sin(pt.lat)));
                                    break
                                case 2:
                                    pt.lon = normalizeLongitude(midlng + normalizeLongitude(midlng - pt.lon));
                            }
                        } else {
                            pt.lat = lats1[i - 9];
                            pt.lon = lons1[i - 9];
                        }
                        if (pt.lon !== midlng || pt.lat !== midlat || testcenter) {
                            sum = 0;
                            for (let j = 0; j < lats1.length - 1; j++) {
                                sum += Math.acos(sinlats[j] * Math.sin(pt.lat) + coslats[j] * Math.cos(pt.lat) * Math.cos(pt.lon - lons1[j]));
                            }
                            if (!testcenter) {
                                if (sum < mindist) {
                                    mindist = sum;
                                    minlat = pt.lat;
                                    minlon = pt.lon;
                                }
                            } else {
                                gMindist = sum;
                                testcenter = false;
                            }
                        }
                        i--;
                    }
                    if (mindist - gMindist < -4.0e-14) {
                        midlat = minlat;
                        midlng = minlon;
                        gMindist = mindist;
                    } else {
                        distrad = distrad * 0.5;
                    }
                    tries++
                }
                if (tries >= 5000) {
                    console.log('The center of distance for these ' + p.length + ' places could not be precisely located. The displayed center of distance is probably accurate to within two degrees.');
                }
            }
        }

        if (!par) {
            midlat = deg(midlat);
            midlng = deg(midlng);
        } else {
            midlat = parlat;
            midlng = parlng;
        }
        return ({longitude: midlng, latitude: midlat})
    }
}