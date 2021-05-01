const axios = require('axios');

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    lat1 = parseFloat(lat1); lon1 = parseFloat(lon1);
    lat2 = parseFloat(lat2); lon2 = parseFloat(lon2);
    console.log(lat1, lon1, lat2, lon2);
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

exports.sortByDistance = async (source, coordinates) => {
    try {
        console.log(source);
        const latlongS = await axios.get('http://api.zippopotam.us/IN/' + source);
        console.log(latlongS.data);
        const l = latlongS.data.places;
        if (l.length < 1) return "INVALID PINCODE";
        const x0 = l[0].latitude;
        const y0 = l[0].longitude;
        var res = [];
        await Promise.all(coordinates.map(async (dest) => {
            try {
                if(dest.VerifiedDonor=='approved') {
                    const x1 = dest.Latitude;
                    const y1 = dest.Longitude;
                    const dist = getDistanceFromLatLonInKm(x0, y0, x1, y1);
                    res.push({
                        distanceKM: dist,
                        FullName: dest.FullName,
                        Contact: dest.Contact,
                        RegistrationDate: dest.RegistrationDate,
                        BloodGroup: dest.BloodGroup,
                        Age: dest.Age,
                        Sex: dest.Sex,
                        ZipCode: dest.ZipCode
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        }));
        res = res.sort(async (a, b) => {
            if (a.distanceKM != b.distanceKM) {
                if (a.distanceKM > b.distanceKM) return 1;
                else return -1;
            }
            else if (a.RegistrationDate != b.RegistrationDate) {
                if (a.RegistrationDate < b.RegistrationDate) return 1;
                else return -1;
            }
            if (a.FullName > b.FullName) return 1;
            return -1;
        });
        return res;
    }
    catch (err) {
        console.log(Object.keys(err.response.data).length);
        return {};
    }
}