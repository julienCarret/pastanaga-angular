import { of } from 'rxjs';
var FakeSvgLoader = /** @class */ (function () {
    function FakeSvgLoader() {
    }
    FakeSvgLoader.prototype.getSvg = function (url) {
        return of('<svg></svg>');
    };
    return FakeSvgLoader;
}());
export { FakeSvgLoader };
export function svgLoaderFactory() {
    return new FakeSvgLoader();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3Rlc3QudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl0QztJQUFBO0lBSUEsQ0FBQztJQUhHLDhCQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2QsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQjtJQUM1QixPQUFPLElBQUksYUFBYSxFQUFFLENBQUM7QUFDL0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdmdMb2FkZXIgfSBmcm9tICdhbmd1bGFyLXN2Zy1pY29uJztcblxuXG5leHBvcnQgY2xhc3MgRmFrZVN2Z0xvYWRlciBpbXBsZW1lbnRzIFN2Z0xvYWRlciB7XG4gICAgZ2V0U3ZnKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG9mKCc8c3ZnPjwvc3ZnPicpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN2Z0xvYWRlckZhY3RvcnkoKSB7XG4gICAgcmV0dXJuIG5ldyBGYWtlU3ZnTG9hZGVyKCk7XG59XG4iXX0=