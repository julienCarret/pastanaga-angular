import { Observable } from 'rxjs';
import { SvgLoaderInterface } from './svg-loader.interface';
import { Renderer2 } from '@angular/core';
export declare class SvgLoader implements SvgLoaderInterface {
    loadSvgFromSsr(iconPath: string, renderer: Renderer2): Observable<SVGElement>;
}
