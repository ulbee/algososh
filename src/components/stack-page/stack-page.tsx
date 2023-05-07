import React, { FormEvent, useState, ChangeEvent, useRef } from "react";
import styles from './stack-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const ANIMATION_TIMEOUT = 300;

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  clone: () => IStack<T>;
  getElements: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  constructor(elements?: T[]) {
    if (elements) {
      this.container = elements;
    }
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  }
  clone = () => {
    return new Stack(this.container);
  }

  getElements = () => this.container;

  getSize = () => this.container.length;
}

export const StackPage: React.FC = () => {
  const [elements, setElements] = useState<IStack<string>>(new Stack<string>());
  const [text, setText] = useState('');
  const [headHilighted, setHeadHilight] = useState(false);

  const deleteElement = () => {

    setHeadHilight(true);

    setTimeout(() => {
      setHeadHilight(false);

      elements.pop();
      setElements(elements.clone());
    }, ANIMATION_TIMEOUT)
  }

  const clearStack = () => {
    elements.clear();

    setElements(elements.clone());
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    elements.push(text);

    setElements(elements.clone());
    setText('');
    setHeadHilight(true);
    setTimeout(() => {
      setHeadHilight(false);

      setElements(elements.clone());
    }, ANIMATION_TIMEOUT)

  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input maxLength={4} type="text" value={text} isLimitText onChange={onInputChange} />
        <Button type="submit" text="Добавить" disabled={!text} />
        <Button type="button" text="Удалить" onClick={deleteElement} disabled={!elements.getSize()}/>
        <Button type="button" text="Очистить" onClick={clearStack} disabled={!elements.getSize()}/>
      </form>
      <div className={styles.container}>
        {elements.getElements().map((el, i) => {
          if (i === elements.getSize() - 1) {
            return <Circle key={i} letter={el} index={i} head='top' extraClass={headHilighted ? styles.current : ''}/>
          }
          return <Circle key={i} letter={el} index={i}/>
        })}
      </div>
    </SolutionLayout>
  );
};
