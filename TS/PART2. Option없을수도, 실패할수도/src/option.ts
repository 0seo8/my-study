// 값이 있을수도, 없을 수도 있는 자료구조

export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

export type None = {
  readonly _tag: "None";
};

export type Option<A> = Some<A> | None;

//some과 none타입의 값을 만들어 주는 함수
export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });

export const none = (): Option<never> => ({ _tag: "None" });

//some타입인지 none타입인지 알아보는 함수, oa is Some<A>는 타입가드
export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some";
export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === "None";

// undefined를 사용해 값의 부재를 나타내는 타입을 옵션으로 변환해주는 함수

export const fromUndefined = <A>(a: A | undefined): Option<A> => {
  if (a === undefined) return none();
  return some(a);
};

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
  //값이 없으면 지정된 값을 사용
  if (isNone(oa)) return defaultValue;
  // 값이 있다면 해당 값을 사용
  return oa.value;
};
