export function diff_hours(dts2, dts1) {
    let dt1 = new Date(dts1);
    let dt2 = new Date(dts2);
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }
