import { TestBed, async, inject } from '@angular/core/testing';

import { DepartmentsGrouppedListGuard } from './departments-groupped-list.guard';

describe('DepartmentsGrouppedListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentsGrouppedListGuard]
    });
  });

  it('should ...', inject([DepartmentsGrouppedListGuard], (guard: DepartmentsGrouppedListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
