#include <bits/stdc++.h>
using namespace std;
#define ll long long
long long int mod = 998244353;
const int N = 1e5 + 7;
vector<bool> isprime(N, true);

ll bin_expo(ll a, ll b)
{
    ll temp = 1;
    while (b > 0)
    {
        if (b & 1)
        {
            temp = ((temp % mod) * (a % mod)) % mod;
            b--;
        }
        a = ((a % mod) * (a % mod)) % mod;
        b >>= 1;
    }
    return temp % mod;
}

ll hcf(ll a, ll b)
{
    return ((a * b) / (__gcd(a, b)));
}

void sieve_of_eratosthenes()
{
    isprime[0] = isprime[1] = false;
    for (int i = 2; i <= N; i++)
    {
        if (isprime[i] == true)
        {
            for (int j = 2 * i; j <= N; j += i)
            {
                isprime[j] = false;
            }
        }
    }
}

bool ispal(string s)
{
    if (s.size() == 1)
        return true;
    for (int i = 0; i < s.size(); i++)
    {
        if (s[i] != s[s.size() - i - 1])
            return false;
    }
    return true;
}

bool isPrime(ll n)
{
    for (int i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
            return false;
    }
    return true;
}

ll fact(ll n)
{
    ll temp = 1;
    for (int i = 1; i <= n; i++)
    {
        temp = (temp * i) % 998244353;
    }
    return temp;
}

bool compare(pair<ll, ll> &a, pair<ll, ll> &b)
{
    if (a.second == b.second)
    {
        return a.first > b.first;
    }
    return a.second < b.second;
}

string binn(ll n)
{
    string temp = "";
    while (n)
    {
        if (n & 1)
            temp += '1';
        else
            temp += '0';
        n >>= 1;
    }
    reverse(temp.begin(), temp.end());
    return temp;
}

ll find(ll l, ll r, vector<ll> &v, ll k)
{
    if (l > r)
        return 1;
    ll temp = pow(v[l], find(l + 1, r, v, k));
    if (temp % k == 0)
        return temp;
    else
        return temp * find(l + 1, r, v, k);
}

ll binaryExponentiation(ll base, ll exponent, ll modulo)
{
    ll result = 1;
    base %= modulo;
    while (exponent > 0)
    {
        if (exponent & 1)
        {
            result = (result * base) % modulo;
        }
        base = (base * base) % modulo;
        exponent >>= 1;
    }
    return result;
}

void solve()
{
    ll n, m, x;
    cin >> n >> m >> x;
    ll r;
    char c;
    vector<pair<ll, char>> v;
    for (int i = 0; i < m; ++i)
    {
        cin >> r >> c;
        v.push_back({r, c});
    }

    set<ll> ans;
    ans.insert(x);
    for (auto i : v)
    {
        ll r = i.first;
        char c = i.second;
        set<ll> temp;
        for (auto j : ans)
        {
            ll p;
            ll q;
            if (c == '0')
            {
                p = (j + r) % n;
                if (p == 0)
                    p = n;
                temp.insert(p);
            }
            else if (c == '1')
            {
                q = (j - r + n) % n;
                if (q == 0)
                    q = n;
                temp.insert(q);
            }
            else
            {
                p = (j + r) % n;
                if (p == 0)
                    p = n;
                temp.insert(p);
                q = (j - r + n) % n;
                if (q == 0)
                    q = n;
                temp.insert(q);
            }
        }
        ans = temp;
    }

    cout << ans.size() << endl;
    for (auto i : ans)
    {
        cout << i << " ";
    }
    cout << endl;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    int t;
    cin >> t;
    while (t--)
    {
        solve();
    }
    return 0;
}