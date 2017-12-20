	#include <iostream>
	#include <string.h>
	using namespace std;
	
   
	class lcs{			
		public:			
			int max(int a, int b){
				return a>b ? a:b;
			}
			/**
			* If last character match: 
			*        1.Increment the length of LCS by 1
			*      	 2.Execute str1[lenStr1-1] and str2[lenStr2-1]
			* else:
			*       find Max(str1[lenStr1-1]str2[lenStr2],str1[lenStr1]str2[lenStr2-1])	
			* 
		    * Recursion Tree:
			*					             lcs("AXYT", "AYZX")
			*                              ----------------------- 
			*		                       /                    \     
			*		         lcs("AXY", "AYZX")               lcs("AXYT", "AYZ")
			*                ------------------               -------------------
			*		         /             \                 /                  \    
			*		lcs("AX", "AYZX") lcs("AXY", "AYZ")   lcs("AXY", "AYZ")    lcs("AXYT", "AY")
			*       ----------------  ----------------    ----------------    -----------------
			*
			*  How to do this:
			*     Lets follow below step create a table where we need to save the length of "longest common subsequence" 
			*     for the give pair of string.
			*     Steps:
			*         1. create a Table from top to bottom:
			*             1. make first row and first column empty()
			*             2. Now go Row by Row and compare the character with each columns
			*                start loop; untill it finish: 
			*                  If Ri is not match with Cj:
			*                        ---------------------------------------------------------------------------
			*                       | then RiCj = max(left of RiCj, top of RiCj) i.e. max({Ri-1}{Cj},Ri{cj-1}) |
			*                        --------------------------------------------------------------------------
			*             	   else If Ri is match with Cj:
			*                        -------------------------------------------------------------
			*                       | then RiCj = 1+(left-top-diagonal of RiCj) i.e. 1 + {Ri-1,Cj-1} |
			*                        -------------------------------------------------------------
			*                end loop;  
			*         2. Now, start with last char of str1 and str2 i.e.bottom-right corner (e.g.R8C8) to top (e.g. R0C0),
			*            start loop and run untill cur-cell become null;     
			*               if (cur-cell == top-cell OR cur-cell == left-cell) then:
			*                    start loop untill (cur-cell != top-cell) AND (cur-cell != left-cell);
		    *              	          if current-cell value match with top-cell value          
		    *              	               cur-cell = top-cell.
		    *              	          else if current-cell value match with left-cell value 
		    *              	              cur-cell = left-cell.   
			*                     end loop;
			*                if (cur-cell != top-cell AND cur-cell != left-cell) then: 
			*                	//find the max value of left-cell and right-cell
			*                    if max of (left-cell,top-cell) exist; 
			*                           cur-cell = max({R8-1},{C8-1})	
			*                     else in case left-cell == right-cell then move diagonally up; 
			*                           cur-cell = (left-cell-1,right-cell-1)
			*            end loop: 
			*/
			int createLcs(char *str1, char *str2, int lenStr1, int lenStr2){
				int table[lenStr1][lenStr2];
				int i=0;int j=0;
				for (i=0; i<lenStr1; i++){
					for (j=0; j<lenStr2; j++){
						if(i==0 || j ==0){
							table[i][j] = 0;
						}
						else if(str1[i] == str2[j])
						{
							//cout << "\n ll " << 1 + table[i-1][j-1]<< "\n";
							table[i][j] = 1 + table[i-1][j-1];
						}
						else
						{
						//	cout << "\n abc" << this->max(table[i-1][j], table[i][j-1]) << "\n";
							table[i][j] = this->max(table[i-1][j], table[i][j-1]);
						}
						cout <<"["<<i<<"]"<<"["<<j<<"]" <<table[i][j] << "--";
					}
					cout <<"\n";
				}
				
			
				
				i = lenStr1;
				j = lenStr2;
				
				int index = table[i-1][j-1];
				int len = index;	
				char lcs[index];
				lcs[index+1] = '\0';
				
				while( i >=0 && j>=0){
					if(str1[i] == str2[j]){
						lcs[index] =  str1[i];
						i--;j--;index--;
					}
					else if(table[i-1][j] > table[i][j-1]){
						i--;
					}else{
						j--;
					}
				}
				cout <<"\n";
				for(i=-1;i<=len;i++){
					cout<< lcs[i] <<" ";
				}
				cout <<"\n";
			}
	} ;
	int main(){
		lcs obj;
		
		char *str1 = "AGGTAB";//{'A','G','G','T','A','B','\0'};
		char *str2 = "GXTXAYB";//{'G','X','T','X','A','Y','B','\0'};
		cout << "strlen" << strlen(str1) <<"\n\n";
		obj.createLcs(str1, str2,strlen(str1),strlen(str2));
      //  obj.displayTable(table);
	//	obj.checkLastChar(str1,str2);
		
		cout << "hello"<<"\n";
		return 0;
	}
