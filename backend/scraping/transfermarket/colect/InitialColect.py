import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

import PlayersOfTheYear, TopGoalscorers, Tables, Matches

PlayersOfTheYear.players_of_the_year()
TopGoalscorers.top_goalscorers(1995, 1)
Tables.tables_data(1995, 1)
matches_list = Matches.matches_data(2023, 1)
Matches.match_data(matches_list)