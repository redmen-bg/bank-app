import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('access_token')) {
            const copiedReq = req.clone(
                {
                    headers: req.headers
                        .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                        .set('Accept', 'application/json')
                });
            return next.handle(copiedReq);
        } else {
            return next.handle(req);
        }
    }
}
