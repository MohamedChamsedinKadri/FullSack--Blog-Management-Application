export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
};

export const sanitizeInput = (input: string) => {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

