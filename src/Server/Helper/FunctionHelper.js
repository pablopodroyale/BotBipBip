 function getMySqlDateNow() {
    return new Date().toISOString().split('T')[0] + ' '  + new Date().toTimeString().split(' ')[0];
}

export default{
    getMySqlDateNow
}