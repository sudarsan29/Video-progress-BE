const Update = require('../models/updateModel');

const mergeIntervals = (intervals) => {
    if (!intervals.length) return [];

    intervals.sort((a,b) => a.start - b.start);
    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];
        const current = intervals[i];

        if(current.start <= last.end) {
            last.end = Math.max(last.end, current.end);
        } else {
            merged.push(current);
        }
    }

    return merged;
};

const saveUpdate = async (req, res) => {
    const { userId, videoId, watchedIntervals, videoDuration } = req.body;

    try {
        console.log('Request data:', { userId, videoId, watchedIntervals, videoDuration });
        
        if (isNaN(videoDuration) || videoDuration <= 0) {
            return res.status(400).json({ error: 'Invalid video duration' });
        }

        let update = await Update.findOne({ userId, videoId });

        if (update) {
            const combined = [...update.watchedIntervals, ...watchedIntervals];
            const merged = mergeIntervals(combined);
            const totalWatched = merged.reduce((sum, interval) => sum + (interval.end - interval.start), 0);

            if (isNaN(totalWatched) || totalWatched < 0) {
                return res.status(400).json({ error: 'Invalid total watched time' });
            }

            const updatePercent = Math.min((totalWatched / videoDuration) * 100, 100);

            if (isNaN(updatePercent)) {
                return res.status(400).json({ error: 'Invalid update percentage' });
            }

            update.watchedIntervals = merged;
            update.updatePercent = updatePercent;
            await update.save();
        } else {
            const merged = mergeIntervals(watchedIntervals);
            const totalWatched = merged.reduce((sum, interval) => sum + (interval.end - interval.start), 0);

            if (isNaN(totalWatched) || totalWatched < 0) {
                return res.status(400).json({ error: 'Invalid total watched time' });
            }

            const updatePercent = Math.min((totalWatched / videoDuration) * 100, 100);

            if (isNaN(updatePercent)) {
                return res.status(400).json({ error: 'Invalid update percentage' });
            }

            update = new Update({ userId, videoId, watchedIntervals: merged, updatePercent });
            await update.save();
        }

        res.json(update);
    } catch (error) {
        console.error('Error saving progress:', error);  // Add this line for better visibility
        res.status(500).json({ error: 'Failed to save progress' });
    }
};


const getUpdate = async (req, res) => {
    const {userId, videoId} = req.params;

    try{
        const update = await Update.findOne({ userId, videoId });
        if(!update) {
            return res.json({ watchedIntervals: [], updatePercent: 0 });
        }

        res.json(update);
    } catch (error) {
        res.status(500).json({ error: ' Failed to fetch progress' });
    }
};


module.exports = { saveUpdate, getUpdate }; 