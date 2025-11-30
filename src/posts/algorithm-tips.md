## 알고리즘 잡기술 모음

알고리즘 문제를 풀 때, 흔히들 말하는 잡기술이 없으면 돌아가게 되는 문제들이 존재한다. 이런 문제를 풀 때 도움을 줄 만한 잡기술들을 정리해서 써두려 한다. 언어는 C++ 기준이다. 생각나는 거 있을때마다 적어둘 생각이다.

## 아스키 코드 이용 방법

- **(문자형) - '0'**: 숫자가 그대로 출력된다.
- **(알파벳) - 26**: 문자열 관련된 문제 해결 시 많이 사용하는데, z일 경우 a로 돌려준다.
- **(대문자) + 32**: 대문자 알파벳을 소문자로 바꿔준다.
- **(소문자) - 32**: 소문자 알파벳을 대문자로 바꿔준다.

사실 간단하게 라이브러리를 사용해도 된다. 주로 문자열 문제에서 많이 사용된다.

## 중복 허용이 안될 때

수많은 알고리즘 문제에서 문자열 혹은 숫자의 집합이 중복을 허용하지 않고 출력하라는 문제가 나올 때가 있다. 예를 들면, {1,2,3...} 인 집합에서 중복을 허용하지 않는 특정 부분 집합을 출력하라거나 하는 식이다. 이 때, 이 중복 허용을 하지 않는다는 조건 때문에 수많은 작업을 거치는데 간단한 잡기술이 있다.

1. **들어온 벡터 혹은 문자열 정렬**: 간단하게 sort를 사용하면 된다.
2. **C++ set 사용**: C++ set은 vector를 선언해도 자동으로 중복을 제거해주는 아주 훌륭한 기능이 있다. 이걸로 리턴하면 된다.

예: [LeetCode Combination Sum II](https://leetcode.com/problems/combination-sum-ii/solutions/5628773/beats-100-explained-with-video-c-java-python-backtracking-explained-in-detail/)

(작동은 안된다. 저긴 시간초과 난다. 예시용으로만 참고하길 바란다.)

```cpp
class Solution {
public:
    set<vector<int>> ans;
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<int> subnums;
        sort(candidates.begin(), candidates.end());
        findAns(0, candidates, subnums, target);
        return vector<vector<int>>(ans.begin(), ans.end());
    }

private:
    void findAns(int index,
                 vector<int>& nums,
                 vector<int>& subnums, 
                 int target) {
        int sum = 0;
        for(int k : subnums)
            sum += k;
        if(sum == target) {
            ans.insert(subnums);
            return;
        }
        if(sum > target)
            return;

        for(int k = index; k < nums.size(); k++) {
            subnums.push_back(nums[k]);
            findAns(k+1, nums, subnums, target);
            subnums.pop_back();
        }
    }
};
```

아주 자주 사용된다.

## bool 형식 리턴

백트래킹, 브루트 포스 같은 형식의 문제를 풀다 보면, 재귀로 여러 방면의 값을 찾아 그 중에서 true 혹은 false 값을 리턴해야 하는 문제들이 존재한다. 이 때 사용하기에 아주 좋은 방식이다.

예: [LeetCode Word Search](https://leetcode.com/problems/word-search/)

보통 이런 식의 문제를 리턴할 때는,

```cpp
class Solution {
public:
    int dx[4] = {0, 1, 0, -1};
    int dy[4] = {1, 0, -1, 0};

    bool exist(vector<vector<char>>& board, string word) {
        bool check[11][11];
        for(int i = 0; i < board.size(); i++) {
            for(int j = 0; j < board[0].size(); j++) {
                if(findAns(board, word, i, j, 0, check)) return true;
            }
        }
        return false;
    }

private:
    bool findAns(vector<vector<char>>& board, string target, int x, int y,
                 int z, bool check[11][11]) {
        if(z == target.size()) {
            return true;
        }
        if (x < 0 || y < 0 || x >= board.size() || y >= board[0].size() || 
            board[x][y] != target[z] || check[x][y] == true) {
            return false;
        }
        check[x][y] = true;
        bool ret = findAns(board, target, x+dx[0], y+dy[0], z+1, check) ||
                   findAns(board, target, x+dx[1], y+dy[1], z+1, check) ||
                   findAns(board, target, x+dx[2], y+dy[2], z+1, check) ||
                   findAns(board, target, x+dx[3], y+dy[3], z+1, check);
        check[x][y] = false;
        return ret;
    }
};
```

이런 식으로 `||` 연산자를 사용하여 값을 리턴한다. 저 문제는 실제로 내가 푼 문제인데, for 문 사용하려다 못했다. 근데,

```cpp
class Solution {
public:
    int dx[4] = {0, 1, 0, -1};
    int dy[4] = {1, 0, -1, 0};

    bool exist(vector<vector<char>>& board, string word) {
        bool check[11][11];
        for(int i = 0; i < board.size(); i++) {
            for(int j = 0; j < board[0].size(); j++) {
                if(findAns(board, word, i, j, 0, check)) return true;
            }
        }
        return false;
    }

private:
    bool findAns(vector<vector<char>>& board, string target, int x, int y,
                 int z, bool check[11][11]) {
        if(z == target.size()) {
            return true;
        }
        if (x < 0 || y < 0 || x >= board.size() || y >= board[0].size() || 
            board[x][y] != target[z] || check[x][y] == true) {
            return false;
        }
        check[x][y] = true;
        int ret = findAns(board, target, x+dx[0], y+dy[0], z+1, check) +
                   findAns(board, target, x+dx[1], y+dy[1], z+1, check) +
                   findAns(board, target, x+dx[2], y+dy[2], z+1, check) +
                   findAns(board, target, x+dx[3], y+dy[3], z+1, check);
        check[x][y] = false;
        return ret;
    }
};
```

int 형식으로 받고 그냥 더해서 리턴해주면 정상 동작한다. bool 형식은 0은 false, 1 이상이면 전부 true로 처리하기에 이렇게 동작한다. 알고는 있었지만 실제 스터디원중에 저 원리를 사용해 코드를 깔끔하게 짜신 분이 있어 정리해둔다.

