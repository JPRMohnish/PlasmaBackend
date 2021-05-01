const axios=require('axios');
exports.validatePin=async (source) => {
    try {
        const latlongS = await axios.get('http://api.zippopotam.us/IN/' + source);
        console.log(latlongS.data);
        return latlongS.data;
    }
    catch(err) {
        return err;
    }
}