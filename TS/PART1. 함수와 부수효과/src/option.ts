// 값이 있을 수도 없을 수도 있는 자료구조

// 제너릭을 이용해 다른 값을 가질 수 있도록 해줘야함
export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

//none의 경우 값이 없는 경우를 나타내기 때문에 다른 타입이 필요 없음
export type None = {
  readonly _tag: "None";
};

export type Option<A> = Some<A> | None;

//option을 설정하려며 태그를 하하나 적어줘야해서 불편
//const n1: Option<number> = { _tag: "Some", value: 1 };

//값을 조금 더 쉽게 만들기 위해 some과 none타입의 값을 만들어주는 함수를 구현.
//타입을 더 안전하고 정확하게 만들 수 있습니다.
export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });

export const none = (): Option<never> => ({ _tag: "None" });

//Some타입인지, none타입인지 알 수 있는 함수
export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some";
export const isNonw = <A>(oa: Option<A>): oa is None => oa._tag === "None";

//undefined를 사용해 값의 부재를 나타내주는 타입을 옵션으로 변환해주는 함수.
//undeinded와 union으로 조합된 모든 타입을 인자로 받아서, 옵션을 리턴해야함
export const fromUndefined = <A>(a: A | undefined): Option<A> => {
  if (a === undefined) return none();
  return some(a);
};

// 값이 없으면 지정된 값을 사용하고, 있으면 해당 값을 사용한다.
