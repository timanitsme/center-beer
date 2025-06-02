
const addProxyToImageUrl = (url) => {
    if (!url) return null;
    return `/image-proxy?url=${encodeURIComponent(url)}`;
};

export default addProxyToImageUrl;