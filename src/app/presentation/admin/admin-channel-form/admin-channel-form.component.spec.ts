import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChannelFormComponent } from './admin-channel-form.component';

describe('AdminChannelFormComponent', () => {
  let component: AdminChannelFormComponent;
  let fixture: ComponentFixture<AdminChannelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChannelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
