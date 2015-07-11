function DateHelper() {

  var _spell_month_short_arr = ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"];

  var _spell_month_arr = ["January", "February",
      "March", "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"];

  function _spell_month(month) {
    return _spell_month_arr[month];
  }

  function _spell_month_short(month) {
    return _spell_month_short_arr[month];
  }

  function _make_short_date(date) {
    var splited = date.split('/');
    var year  = parseInt(splited[2], 10);
    var month = parseInt(splited[1], 10);
    // var day = parseInt(splited[0]);
    
    return _spell_month_short_arr[month - 1] + "-" + year;
  }

  return {
    spell_month: _spell_month,
    spell_month_short: _spell_month_short,
    make_short_date: _make_short_date
  }
}