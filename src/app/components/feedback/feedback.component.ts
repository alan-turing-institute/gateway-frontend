import { Component, Input} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'feedback-content',
  template: `
  <div class="modal">
  <div class="modal-dialog fadeDown" role="dialog" aria-hidden="true">
      <div class="modal-content">
          <div class="modal-header">
              <button aria-label="Close" class="close" type="button">
                  <clr-icon aria-hidden="true" shape="close"></clr-icon>
              </button>
              <h3 class="modal-title">I have a nice title</h3>
          </div>
          <div class="modal-body">
              <p>But not much to say...</p>
          </div>
          <div class="modal-footer">
              <button class="btn btn-outline" type="button">Cancel</button>
              <button class="btn btn-primary" type="button">Ok</button>
          </div>
      </div>
  </div>
</div>
<div class="modal-backdrop" aria-hidden="true"></div>

`
})

export class FeedbackComponent {
    title: string = "Submitting simulation";
    message: string = "Navigating to Dashboard";
    
    constructor(public bsModalRef: BsModalRef) {}
  }
  
