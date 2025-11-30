## 개요

비트마스킹과 관련된 문제를 풀었고, 비트마스킹에 대해 효율성을 느끼고 신기해서 이렇게 글로 정리해두려 한다.

## 비트마스킹이란?

비트마스킹은, 우리가 아는 비트의 연산 단위를 이용해 연산을 효율적으로 하는 방법을 말한다. 자료구조라기보다는 일종의 구현 기법으로 보면 되고 아는 것과 모르는 것의 차이가 크다.

컴퓨터는 숫자와 데이터를 0과 1을 사용한 비트를 통해 구현한다. 이를 활용하는 기법이 비트마스킹이라고 할 수 있다.

### 간단한 비트마스킹 연산자

```
&: AND 연산
|: OR 연산
^: XOR 연산
~: 피연산자의 모든 비트를 뒤집기
<<: 피연산자의 비트 열을 왼쪽으로 이동
>>: 피연산자의 비트 열을 오른쪽으로 이동
```

이 비트의 연산자인데, 이것만 봐서는 어떤 형식으로 문제를 풀어야 하는지 감이 오지 않는다.

그렇다면, 실전 문제를 통해 알아보자.

## 실전 문제 (쉬운 문제)

- [NeetCode - Single Number](https://neetcode.io/problems/single-number)
- [LeetCode 136번 문제](https://leetcode.com/problems/single-number/description/)

리트코드 136번 문제이다.

이 문제는 비트 연산이 어떤 식으로 사용되고 얼마나 효율적으로 사용될 수 있는지를 알려준다.

숫자 배열을 받아 중복되지 않은 수를 리턴한다고 할 때, 이 문제를 어떻게 풀어야 할까?

비트마스킹을 모르는 상태라고 가정하면, 나는 해쉬맵을 사용해 풀 것이다. 해쉬맵을 사용하면 가장 적은 연산 횟수로 손쉽게 정답을 이끌어 낼 수 있다. 해쉬맵을 사용해 풀었을 경우,

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) {
                seen.erase(num);
            } else {
                seen.insert(num);
            }
        }
        return *seen.begin();
    }
}; // neetcode 출저
```

로 풀 수 있다. 해쉬맵 만큼의 메모리를 사용하고 한 번의 순환으로 풀 수 있다. 하지만 이것을 비트마스킹으로 풀면,

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int answer = 0;
        for (int num : nums) {
            // XOR 연산
            answer ^= num;
        }
        return answer;
    }
}; // leetcode
```

로 아주 간단하게 풀 수 있다. 이 작은 수식과 하나의 변수에서 어떻게 저 정답이 나오는 걸까?

이 부분은 XOR 연산에 대해 생각해보면 쉽게 이해할 수 있다.

![XOR 연산 결과](https://velog.velcdn.com/images/honggilgim/post/bb2b709d-6fd4-4f3a-8682-d8ef013ed926/image.png)

XOR 연산의 결과 값이다. XOR 연산은, 서로 다른 값이어야 참이 되고 같은 값일 경우 거짓을 반환한다.

이 부분을 쉽게 이해하려면

- `A xor 0 = A`
- `A xor A = 0`
- `A xor B = B xor A`

라는 식을 생각하면 된다. XOR 연산자는 교환 법칙이 성립하고, 0 혹은 자기 자신과의 XOR 연산은 0을 반환한다.

즉,

`[A, B, C, D, B, C, D]` 라는 배열이 있을 때

`A xor B xor C xor D xor B xor C xor D`로 식이 이루어지는 이 식을 순서를 바꾸어보면,

`A xor (B xor B) xor (C xor C) xor (D xor D)`가 되고

이는,

`A xor 0 xor 0 xor 0`이므로 `A`가 된다.

솔직히 너무 어렵다. 문제푸는데 인터넷 조사만 한시간은 한거같다. 비트마스킹이라는 카테고리 안에 있어서 비트마스킹으로 풀었지만, 그냥 봤으면 바로 해쉬맵을 사용했을 것 같고 이해하는데에도 많은 시간이 소요됐다.

