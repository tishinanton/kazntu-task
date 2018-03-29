import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

export class MetadataInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const request = req.clone({
            headers: req.headers
                .set('Accept', 'application/json; odata.metadata=none')
                .set('Content-type', 'application/json')
        })
        return next.handle(request);
    }
}