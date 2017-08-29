# tote-betting

Tote-betting is a smiple gaming application written in nodejs. It provides simple form of tote betting with three types of bets - Win, Place, Exacta. In tote betting pool is generated from individuals placing money on a Tote bet in a race and dividend paid out from the betting pool collected.
This application is devloped using expressjs and file system is used with json structure mimicing mongodb.  

Once race gets started, punters put up bets. Once results are provided, race gets over and dividends are paid for all products (bets).This is the return for a $1 stake for each paying selection in the race. 
Dividends are calculated based on the following rules-

### WIN
1. Punters must choose the winner of a race
2. 15% commission from the Win pool is deducted
3. The remaining total is split, proportionally to stake, amongst punters who chose the correct winning horse.

### Place
1. Punters must choose the first, second or third place horse in a race
2. 12% commission from the Place pool is deducted
3. The total pool is split evenly into 3 and each of these amounts is then split, proportionally to stake, amongst the punters who chose each placed horse

### Exacta
1. Punters must choose the first and second place runners in a race in the correct order
2. 18% commission from the Exacta pool is deducted
3. The remaining total is split, proportionally to stake, amongst punters who chose the correct first and second horse in correct order

All dividends are calculated to the nearest $0.01.

## Intalling and Running the Application:
Please follow the below steps- 
1. Clone the respository
2. Run npm install within the cloned directory
3. Hit http://localhost:8080 , This will take you to bets page which is starting points of application.At this point race is already started or you have entered the race already on.
4. One can put bets in the format described in the below section.One can put as many bets one at a time.
5. One can be dired to 'result' page by clinking on the link given for same.
6. Results to be entered in the format as described in below section.
7. Once result is submitted , race is over and output dividend get published.
8. One can start a new race by clicking the link or again hitting the home url. 

## Input

Application takes two inputs - Bet and result
### Bet
The format of bets is Bet:\<product\>:\<selections\>:\<stake\> 
where \<product\> is one of W, P, E 
\<selection\> is either a single runner number (e.g. 4 ) for Win and Place, or two runner numbers (e.g. 4,3) for Exacta 
\<stake\> is an amount in whole dollars (e.g. 35)
**For example**: 
 - Bet:W:3:5 is a $5 bet on horse 3 to win 
 - Bet:P:2:10 is a $10 bet on horse 2 to come first, second or third 
 - Bet:E:5,7:15 is a $15 bet on horses 5 and 7 to come first and second in that order

### Result
The format of the results is Result:\<first\>:\<second\>:\<third>\'. 
For example: 
Result:5:3:8 represents a race where horse 5 finished first, horse 3 finished second and horse 8 finished third.

*Please note*- 
- Input is case-sensitive

# Output
Dividends are shown following format on the results page
\<product\>:\<winning selection\>:\<dividend\>

**For example**:

W:2:$2.61 # Win bet on horse 2 yields $2.61

P:2:$1.06 # Place bet on horse 2 yields $1.06

P:3:$1.27 # Place bet on horse 3 yields $1.27

P:1:$2.13 # Place bet on horse 1 yields $2.13

E:2,3:$2.43 # Exacta on horses 2,3 yields $2.43
