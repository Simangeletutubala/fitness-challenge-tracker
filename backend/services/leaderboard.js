const User = require("../models/User");
const Challenge = require("../models/Challenge");
const ProgressLog = require("../models/ProgressLog");
const Leaderboard = require("../models/Leaderboard");

async function  populateLeaderboards() {

    const appUsers = (await User.find({}));
    const allChallenges = (await Challenge.find({}));

    if(appUsers && allChallenges){
        for (let index = 0; index < appUsers.length; index++) {
            const appUser = appUsers[index];  
            for (let index = 0; index < allChallenges.length; index++) {
                const challenge = allChallenges[index]; 
                let points = 0;
       
                const progressLogs = (await ProgressLog.find({user_id : appUser._id, challenge_id : challenge._id})).forEach( log => {
                    points = points + log.value;
                });       
                

                try {
                    await Leaderboard.findOneAndUpdate(
                        { challenge_id : challenge._id ,user_id: appUser._id},
                        {
                          $set: {                        
                            challenge_id: challenge._id,
                            user_id: appUser._id,
                            score: points,
                          },
                        },
                        { upsert: true, new: true }
                      );
                  } catch (err) {
                    console.log(err);
                  }  
                
            }          
        }
    }
  }
    
  module.exports = populateLeaderboards;