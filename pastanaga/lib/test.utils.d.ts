import { Observable } from 'rxjs';
import { SvgLoader } from 'angular-svg-icon';
export declare class FakeSvgLoader implements SvgLoader {
    getSvg(url: string): Observable<string>;
}
export declare function svgLoaderFactory(): FakeSvgLoader;
