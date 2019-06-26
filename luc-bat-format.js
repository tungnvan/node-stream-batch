module.exports.lucBatFormat = function(data_buffer) {
    const data_string = data_buffer.toString('utf-8');
    const data_array = data_string.replace(/[0-9]+\./g, '').split(/\s\s*/);
    let is_six = true;
    for (let i = 6; i < data_array.length; ) {
        data_array.splice(i, 0, '\n');
        is_six = !is_six;
        i = is_six ? i + 7 : i + 9;
    }
    const result = data_array.join(' ').replace(/\n\s*/g, '\n');
    return result;
};