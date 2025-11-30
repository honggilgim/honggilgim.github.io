## String 배열

String 배열 즉 참조 변수의 배열이다. 이 변수들은 참조변수의 기본값인 null로 초기화된다.

```java
String arr[] = new String[3]; // 기본 선언
```

기본 초기화 방법은 앞에서 살펴본 배열과 동일하게 사용이 가능하다.

## char 배열과 String 배열

문자열을 저장할 때 보통 String 타입을 활용하지만, 사실 문자열을 문자배열인 char 배열과 똑같은 뜻이다. 자바에서 String은 char배열에 여러 가지 기능을 추가하여 확장한 기능이다. 그래서 String이 char 배열을 이용해 문자열을 다루는 것보다 훨씬 편하다.

String안에 있는 값은 변경이 불가능해서, 자바에서 String 클래스에 연산자를 활용하는 일은 즉 새로운 내용의 문자열을 만드는 일이다.

```java
class Main {
    public static void main(String args[]) {
        ...
    }
}
```

Main 함수의 간단한 선언부인데, 여기서 String 배열을 살펴볼 수 있다. 이 스트링 배열로 커맨드라인에서 간단한 명령어 역시 받을 수 있다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("args 길이" + args.length);

        for(int i = 0; i < args.length; i++) {
            System.out.println(i + " 번째 : " + args[i]);
        }
    }
}
```

간단한 자바 메인함수를 작성하고,

![Java 빌드](https://velog.velcdn.com/images/honggilgim/post/e6c34ba0-2e0f-4d20-aed5-32f3d18c8527/image.png)

자바를 빌드한다.

![매개변수 전달](https://velog.velcdn.com/images/honggilgim/post/d77f3789-681c-4e27-bf63-1f1871b6b90f/image.png)

그러면 이렇게 매개변수를 받을 수 있다!

## 다차원 배열

다차원 배열은 2차원 이상의 배열에

```java
int[][] arr;
int arr[][];
int[] arr[];
```

이런 형식으로 선언해주면 된다.

- `타입[][] 변수이름;`
- `타입 변수이름[][];`
- `타입[] 변수이름[];`

주로 테이블 형태의 데이터를 받기 위해 생성되며,

```java
int arr[][] = new int[5][5]; // 5 * 5배열
```

이런 식으로 초기화해서 사용하면 된다. 그러면 총 25개의 값을 저장할 수 있는 배열이 생성된다.

배열의 인덱스는 기존에 사용하던 배열들과 같다. 초기화를 할 때는,

```java
int arr[][] = {{1, 2}, {1, 2}, {1, 2}};
```

이런 식으로 해주면 되는데 저렇게 생성할 경우 2*3 배열이 생성된다. `new int[2][3];`의 경우는 생략이 가능하다.

`arr.length`로 해볼 경우 3개의 배열이 들어갔으므로 3이 되고,

`arr[0].length`로 할 경우 arr 배열 안의 배열이므로 2가 된다.

