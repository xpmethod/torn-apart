import { randomNormal, randomUniform } from "d3-random";

export default function(d){
  if((d.minAngle === 360 && d.maxAngle === 710) || (d.minAngle === 0 && d.maxAngle === 0)){
    d.angle = randomUniform(-180, 180)();
    d.color = "black";
  } else {
    let angle = d.minAngle + ((d.maxAngle - d.minAngle) / 2);
    d.origAngle = angle;
    const sigma = angle - d.minAngle;
    if(angle > 360){ // normalize all the angles on one loop over the circle.
      angle = angle - 360;
    }
    if(angle > 270){
      // 340 => 160
      angle = angle - 180;
    } else if (angle > 90){
      // 110 => -20
      angle = 0 - angle + 90;
    } else {
      // 80 => 10
      angle = 90 - angle;
    }
    d.angle = randomNormal(angle, sigma / 3)();
    d.color = "black";
  }
  return d;
}

