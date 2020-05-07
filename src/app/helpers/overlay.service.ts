import { Injectable } from '@angular/core';
import {ComponentPortal, PortalOutlet} from '@angular/cdk/portal';
import {Overlay} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  // PortalHost
  overlayRef: PortalOutlet;
  portalAttached: boolean;

  constructor(private overlay: Overlay) {
  }

  public open(comp) {
    const shortcutFormPortal = new ComponentPortal(comp);

    this.overlayRef = this.overlay.create();
    this.overlayRef.attach(shortcutFormPortal); // Attach ComponentPortal to PortalHost
    this.portalAttached = true;
  }

  public closeOverlay() {
    this.overlayRef.detach();
    this.portalAttached = false;
  }
}
