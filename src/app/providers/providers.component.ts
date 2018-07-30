import { Component, OnInit} from '@angular/core';
import { AuthorizationService } from '../shared/authorization.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { Provider } from '../shared/provider.model';
import { ProviderService } from './providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
  providers: [ProviderService]
})
export class ProvidersComponent implements OnInit {
  provider: string; code: string;
  providers: Provider[] = [];
  constructor(private providerService: ProviderService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (params['code'] !== 'null') {
        this.code = params['code'];
      }
    });
    this.providerService.getProviders(this.code)
    .subscribe((providers: any) => {
      providers.data.forEach(provider => {
        this.providers.push(provider.attributes);
      });
      this.provider = this.providers[0].provider;
    }, error => {
      console.log(error);
    });
  }
  getUrl() {
    this.providerService.getUrl(this.provider)
      .subscribe((data: any) => {
        window.location.href = data.url;
      });
  }
}
