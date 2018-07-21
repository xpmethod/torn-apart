import { randomNormal, randomUniform } from "d3-random";

export default function(d){
  if((d.minAngle === 360 && d.maxAngle === 710) || (d.minAngle === 0 && d.maxAngle === 0)){
    d.angle = randomUniform(-180, 180)();
  } else {
    let angle = d.minAngle + ((d.maxAngle - d.minAngle) / 2);
    const sigma = angle - d.minAngle;
    if(angle > 360){
      angle = angle - 360;
    }
    if(angle >= 270){
      angle = 180 - angle - 270;
    } else if (angle > 90){
      angle = 0 - angle + 90;
    } else {
      angle = 90 - angle;
    }
    d.angle = randomNormal(angle, sigma / 2)();
  }
  return d;
}

