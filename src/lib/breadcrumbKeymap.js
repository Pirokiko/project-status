export const breadcrumbKeyMap = {
    'home' : {
        'client' : {
            'project' : {
                'sprint': {},
            }
        }
    }
};

export const getKeyListForBreadcrumbKey = key => {
    return getKeyListForBreadcrumb(key, breadcrumbKeyMap);
};

const getKeyListForBreadcrumb = (key, map) => {
    const keys = Object.keys(map);
    if(keys.includes(key)) return [key];

    for(let mapKey of keys){
        const mapKeyResult = getKeyListForBreadcrumb(key, map[mapKey]);
        if(mapKeyResult){
            return [mapKey, ...mapKeyResult];
        }
    }

    return null;
};