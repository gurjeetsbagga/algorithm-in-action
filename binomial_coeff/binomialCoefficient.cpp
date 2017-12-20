#include<iostream>

using namespace std;

class bCoeff
{
	public:
		int n;
		int r;
		int _d;
		/**
		* Binomial Coeffieciet (C) = n!/(n-r)!r!
		*/
//		int binomialCoeff(int n, int r)
//		{
//			int _nF = this->getFact(n);
//			int _rF = this->getFact(r);
//			int _nrF = this->getFact(n-r);
//			
//			return _nF/(_rF * _nrF);
//		}
		/**
		 * c(n,k) = c(n-1, k-1) + c(n-1, k)
		 *
		 */
		int getFact(int n, int r, char a)
		{
			if(a == 'a')
			{
				cout << "c("<<n<<","<<r<<") -->"<<a<<"  -----  ";
			}
			else
			{
				cout << "\nc("<<n<<","<<r<<") -->"<<a<<"\n\n";
			}
			if(r == 0 || r == n)
			{
				return 1;
			}
			
			return getFact(n-1,r-1,a='a'
		}
};

int main()
{
	bCoeff obj;
	int a = obj.getFact(5,2,'c');
	cout << "Binomial Coefficiet of (5, 2) is: "<<a;
}

