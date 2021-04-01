const parseFormData = (
    keys: string[],
    formData: FormData
): {
    [key: string]: unknown;
} => {
    var res = {};
    keys.forEach((key) => {
        res[key] = formData.get(key) || "";
    });
    return res;
};

export default parseFormData