import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mode: string = "list";
  public title: string = "Minhas Tarefas";
  public todos: Todo[] = [];
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.required
      ])
      ]
    });

    this.load();

  }

  public add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
  }

  public remover(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  public markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  public markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  public save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  public clear() {
    this.form.reset;
  }

  public load() {
    const data = localStorage.getItem('todos');

    if (data) {
      this.todos = JSON.parse(data);
    }
  }

  public changeMode(mode: string) {
    this.mode = mode;
  }

}

