import {Injectable} from "@angular/core";


const HEX_TO_RGB_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

@Injectable({providedIn: 'root'})
export class ColorUtilsService {

  hexToRgb(hex): number[] {
    const result = HEX_TO_RGB_REGEX.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0,0,0];
  }

  rgbToHex(r: number, g: number, b: number) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}
