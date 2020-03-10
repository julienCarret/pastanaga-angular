import { BehaviorSubject } from 'rxjs';
var ToastModel = /** @class */ (function () {
    function ToastModel(data) {
        // Avoids error when input is null
        data = data ? data : {};
        this.key = data.key;
        this.message = data.message;
        this.delay = typeof data.delay === 'number' ? data.delay : 5000; // dismiss after 5s by default
        this.icon = data.icon;
        this.buttons = data.buttons || [];
        this.closeable = data.closeable;
        this.translateParams = data.translateParams;
        this.style = data.style;
        this.componentFactory = data.componentFactory;
        this.componentData = data.componentData;
        if (this.buttons.length > 0) {
            this.onClick = new BehaviorSubject('');
        }
    }
    return ToastModel;
}());
export { ToastModel };
var ToastButtonModel = /** @class */ (function () {
    function ToastButtonModel(data) {
        // Avoids error when input is null
        data = data ? data : {};
        this.id = data.id || data.text || data.icon;
        this.text = data.text;
        this.color = data.color || ToastButtonModel.PRIMARY;
        this.icon = data.icon;
        this.tooltip = data.tooltip;
    }
    ToastButtonModel.PRIMARY = 'primary';
    ToastButtonModel.SECONDARY = 'secondary';
    ToastButtonModel.DESTRUCTIVE = 'destructive';
    return ToastButtonModel;
}());
export { ToastButtonModel };
export var getToastCloseButton = function () {
    return new ToastButtonModel({ icon: 'clear', color: 'secondary', tooltip: 'common.close', text: 'common.close' });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90b2FzdC90b2FzdC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSXZDO0lBbUNJLG9CQUFZLElBQVM7UUFDakIsa0NBQWtDO1FBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyw4QkFBOEI7UUFDL0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUF4REQsSUF3REM7O0FBRUQ7SUFZSSwwQkFBWSxJQUFTO1FBQ2pCLGtDQUFrQztRQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQW5Cc0Isd0JBQU8sR0FBRyxTQUFTLENBQUM7SUFDcEIsMEJBQVMsR0FBRyxXQUFXLENBQUM7SUFDeEIsNEJBQVcsR0FBRyxhQUFhLENBQUM7SUFrQnZELHVCQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0QlksZ0JBQWdCO0FBd0I3QixNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBRztJQUMvQixPQUFPLElBQUksZ0JBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUN0SCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvYXN0Q29tcG9uZW50IH0gZnJvbSAnLi90b2FzdC5jb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgVG9hc3RNb2RlbCB7XG4gICAgb25DbGljaz86IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+O1xuXG4gICAgLy8gSW50ZXJuYWwgdG9hc3QgaWRlbnRpZmllci5cbiAgICBrZXk6IHN0cmluZztcblxuICAgIC8vIE1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB0b2FzdC5cbiAgICAvLyBUbyBkaXNwbGF5IGEgbGluayB3aXRoaW4gaW4gYSB0b2FzdCBtZXNzYWdlLCB0aGV5IG11c3QgYmUgcGFyc2VkIGFzOiBbdGV4dF90b19iZV9kaXNwbGF5ZWR8YW5jaG9yX3VybF1cbiAgICAvL1xuICAgIC8vICdUaGlzIGlzIGEgR29vZ2xlIFtsaW5rfHd3d3cuZ29vZ2xlLmVzXScgLT4gVGhpcyBpcyBhIEdvb2dsZSBsaW5rICh3aGVyZSBcImxpbmtcIiBpbiBhbiBhbmNob3IgdG8gXCJ3d3cuZ29vZ2xlLmVzXCIpXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuXG4gICAgLy8gcGFyYW1zIHRvIGJlIHVzZWQgYnkgdHJhbnNsYXRlIHBpcGVcbiAgICB0cmFuc2xhdGVQYXJhbXMgPzogYW55O1xuXG4gICAgLy8gTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IHRoZSB0b2FzdCB3aWxsIGJlIHZpc2libGUgYmVmb3JlIGJlaW5nIGRpc21pc3NlZCBhdXRvbWF0aWNhbGx5LlxuICAgIC8vIElmIGRlbGF5IGlzIHNldCB0byBaRVJPICgwKSwgdGhlIHRvYXN0IHdvbid0IGJlIGRpc21pc3NpYmxlIHVudGlsIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGl0LlxuICAgIGRlbGF5PzogbnVtYmVyO1xuXG4gICAgLy8gTGlzdCBvZiBidXR0b25zIHRvIGJlIGRpc3BsYXllZC5cbiAgICBidXR0b25zOiBUb2FzdEJ1dHRvbk1vZGVsW107XG5cbiAgICAvLyBJZiB0cnVlIChhbmQgbm8gYnV0dG9ucyBkZWZpbmVkKSwgdGhlIHRvYXN0IHdpbGwgZGlzcGxheSBhIGNsb3NlIGJ1dHRvbiAod2l0aCBhbiBpY29uKS5cbiAgICAvLyBJZiBhIHRvYXN0IGhhcyBidXR0b25zIHRoaXMgcHJvcGVydHkgd2lsbCBiZSBpZ25vcmVkLlxuICAgIGNsb3NlYWJsZT86IGJvb2xlYW47XG5cbiAgICAvLyBUb29sdGlwIGxlYWRpbmcgaWNvbi5cbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICAvLyBjbGFzcyB0byBiZSB1c2VkIGZvciB0b2FzdCBzdHlsZVxuICAgIHN0eWxlOiBzdHJpbmc7XG5cbiAgICBjb21wb25lbnRGYWN0b3J5PzogQ29tcG9uZW50RmFjdG9yeTxUb2FzdENvbXBvbmVudD47XG4gICAgY29tcG9uZW50RGF0YT86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xuICAgICAgICAvLyBBdm9pZHMgZXJyb3Igd2hlbiBpbnB1dCBpcyBudWxsXG4gICAgICAgIGRhdGEgPSBkYXRhID8gZGF0YSA6IHt9O1xuXG4gICAgICAgIHRoaXMua2V5ID0gZGF0YS5rZXk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICB0aGlzLmRlbGF5ID0gdHlwZW9mIGRhdGEuZGVsYXkgPT09ICdudW1iZXInID8gZGF0YS5kZWxheSA6IDUwMDA7IC8vIGRpc21pc3MgYWZ0ZXIgNXMgYnkgZGVmYXVsdFxuICAgICAgICB0aGlzLmljb24gPSBkYXRhLmljb247XG5cbiAgICAgICAgdGhpcy5idXR0b25zID0gZGF0YS5idXR0b25zIHx8IFtdO1xuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGRhdGEuY2xvc2VhYmxlO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVBhcmFtcyA9IGRhdGEudHJhbnNsYXRlUGFyYW1zO1xuICAgICAgICB0aGlzLnN0eWxlID0gZGF0YS5zdHlsZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gZGF0YS5jb21wb25lbnRGYWN0b3J5O1xuICAgICAgICB0aGlzLmNvbXBvbmVudERhdGEgPSBkYXRhLmNvbXBvbmVudERhdGE7XG5cbiAgICAgICAgaWYgKHRoaXMuYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2sgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvYXN0QnV0dG9uTW9kZWwge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUklNQVJZID0gJ3ByaW1hcnknO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU0VDT05EQVJZID0gJ3NlY29uZGFyeSc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBERVNUUlVDVElWRSA9ICdkZXN0cnVjdGl2ZSc7XG5cbiAgICBpZDogc3RyaW5nO1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGljb246IHN0cmluZztcbiAgICB0b29sdGlwOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcbiAgICAgICAgLy8gQXZvaWRzIGVycm9yIHdoZW4gaW5wdXQgaXMgbnVsbFxuICAgICAgICBkYXRhID0gZGF0YSA/IGRhdGEgOiB7fTtcblxuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZCB8fCBkYXRhLnRleHQgfHwgZGF0YS5pY29uO1xuICAgICAgICB0aGlzLnRleHQgPSBkYXRhLnRleHQ7XG4gICAgICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yIHx8IFRvYXN0QnV0dG9uTW9kZWwuUFJJTUFSWTtcbiAgICAgICAgdGhpcy5pY29uID0gZGF0YS5pY29uO1xuICAgICAgICB0aGlzLnRvb2x0aXAgPSBkYXRhLnRvb2x0aXA7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VG9hc3RDbG9zZUJ1dHRvbiA9ICgpOiBUb2FzdEJ1dHRvbk1vZGVsID0+IHtcbiAgICByZXR1cm4gbmV3IFRvYXN0QnV0dG9uTW9kZWwoeyBpY29uOiAnY2xlYXInLCBjb2xvcjogJ3NlY29uZGFyeScsIHRvb2x0aXA6ICdjb21tb24uY2xvc2UnLCB0ZXh0OiAnY29tbW9uLmNsb3NlJyB9KTtcbn07XG4iXX0=