import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  searchForm!: FormGroup;
  users: any[] = [];
  searchResults: any[] = [];
  searchMessage: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.validatePhoneNumber]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  validatePhoneNumber(control: any) {
    const phoneNumber = control.value;
    if (phoneNumber && phoneNumber.length === 10 && phoneNumber[0] !== '0' && phoneNumber[3] !== '0') {
      return null;
    } else {
      return { invalidPhoneNumber: true };
    }
  }

  addUser() {
    if (this.searchForm.valid) {
      const user = this.searchForm.value;
      this.users.push(user);
      this.searchForm.reset();
    }
  }

  searchUsers() {
    const searchTerm = this.searchForm.value;
    this.searchResults = this.users.filter(user =>
      Object.values(user).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm.firstName.toLowerCase())
      )
    );
    this.updateSearchMessage();
  }

  updateSearchMessage() {
    if (this.searchResults.length > 0) {
      this.searchMessage = 'WE HAVE THIS USER.';
    } else {
      this.searchMessage = 'WE DON\'T HAVE THIS USER.';
    }
  }
}
