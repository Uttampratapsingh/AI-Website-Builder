import { generateResponse } from "../config/openRouter.js";
import Website from "../models/website.js";
import User from "../models/user.js";
import { buildMasterPrompt } from "../Template/prompt.js";
import extractJson from "../utils/extractJson.js";
import buildUpdatePrompt from "../Template/updatePrompt.js";

export const generateWebsite = async (req, res) => {
    console.log('Generating website controller called');
    const {prompt} = req.body;
    console.log('Prompt received:', prompt);
    try {
        if(!prompt) {
            return res.status(400).json({error: 'Prompt is required'});
        }
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User.findById(req.user._id);
        if(!user) {
            return res.status(401).json({error: 'Unauthorized'});
        }

        if(!user.credits || user.credits < 50){
            return res.status(403).json({error: 'Not enough credits. Each new website generation costs 50 credits.'});
        }

        const masterPrompt = buildMasterPrompt(prompt);
        console.log('Master prompt built:', masterPrompt);
        let raw = "";
        let parsed = null;
        // generate two times to ensure we get a valid response
        for(let i=0; i<2 && !parsed; i++) {
            raw = await generateResponse(masterPrompt);
            parsed = await extractJson(raw);
            if(!parsed){
                raw = await generateResponse("\n\n RETURN ONLY RAW JSON "+masterPrompt);
                parsed = await extractJson(raw);
            }else{
                break;
            }
        }

        if(!parsed || !parsed.code){
            console.error('Failed to parse JSON after multiple attempts. Raw response:', raw);
            return res.status(500).json({error: 'Failed to generate website. Please try again.'});
        }

        const website = await Website.create({
            user: user._id,
            title: prompt?.slice(0, 50), // limit title to 50 chars
            latestCode: parsed.code || "No code generated",
            conversation: [
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "ai",
                    content: parsed.message
                }
            ]
        })

        user.credits -= 50;
        await user.save();

        res.status(201).json({
            websiteId: website._id,
            remainingCredits: user.credits
        });

    } catch (error) {
        console.error('Error generating website:', error);
        res.status(500).json({error: 'Failed to generate website'});
    }
}



export const getWebsitesById = async (req, res) => {
    console.log('Get website by ID controller called');
    try {
        const website = await Website.findById({
            _id: req.params.id,
            user: req.user._id
            });
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }
        res.status(200).json(website);
    } catch (error) {
        console.error('Error fetching website by ID:', error);
        res.status(500).json({ error: 'Failed to fetch website' });
    }
}


export const changeWebsite = async (req, res) => {
    console.log('Change website controller called');
    try {

        const {prompt} = req.body;
        if(!prompt) {
            return res.status(400).json({error: 'Prompt is required'});
        }
        console.log('Prompt received for update:', prompt);

        const websiteId = req.params.id;
        console.log('Website ID received for update:', websiteId);
        const website = await Website.findOne({_id: websiteId, user: req.user._id});
        if(!website) {
            return res.status(404).json({error: 'Website not found'});
        }
        console.log('Website found for update');

        const user = await User.findById(req.user._id);
        if(!user) {
            return res.status(401).json({error: 'Unauthorized'});
        }

        if(!user.credits || user.credits < 25){
            return res.status(403).json({error: 'Not enough credits. Each website change costs 25 credits.'});
        }

        const updatePrompt = buildUpdatePrompt(prompt, website.latestCode);

        let raw = "";
        let parsed = null;
        // generate two times to ensure we get a valid response
        for(let i=0; i<2 && !parsed; i++) {
            raw = await generateResponse(updatePrompt);
            parsed = await extractJson(raw);
            if(!parsed){
                raw = await generateResponse("\n\n RETURN ONLY RAW JSON "+updatePrompt);
                parsed = await extractJson(raw);
            }else{
                break;
            }
        }

        if(!parsed || !parsed.code){
            console.error('Failed to parse JSON after multiple attempts. Raw response:', raw);
            return res.status(500).json({error: 'Failed to generate website. Please try again.'});
        }

        website.latestCode = parsed.code || website.latestCode;
        website.conversation.push(
            {
                role: "user",
                content: prompt
            },
            {
                role: "ai",
                content: parsed.message
            }
        )
        await website.save();

        user.credits -= 25;
        await user.save();

        res.status(200).json({
            message: parsed.message,
            code: parsed.code,
            remainingCredits: user.credits
        });

    } catch (error) {
        console.error('Error changing website:', error);
        res.status(500).json({ error: 'Failed to change website' });
    }
}


export const getAllWebsites = async (req, res) => {
    console.log('Get all websites controller called');
    try {
        const websites = await Website.find({user: req.user._id}).sort({createdAt: -1}); // sort by newest first
        res.status(200).json(websites);
    } catch (error) {
        console.error('Error fetching all websites:', error);
        res.status(500).json({ error: 'Failed to fetch websites' });
    }
}


export const deployWebsite = async (req, res) => {
    try {
        const websiteId = req.params.id;
        const user = req.user._id;

        const website = await Website.findOne({_id: websiteId, user});
        if(!website) {
            return res.status(404).json({error: 'Website not found'});
        }

        if(!website.slug){
            website.slug = website.title.toLowerCase().replace(/\s+/g, '-').slice(0,50) + '-' + website._id.toString().slice(-5); 
        }

        website.deployed = true;
        website.deployUrl=`${process.env.FRONTEND_URL}/live-site/${website.slug}`;
        await website.save();

        res.status(200).json({url: website.deployUrl});

    } catch (error) {
        console.error('Error deploying website:', error);
        res.status(500).json({ error: 'Failed to deploy website' });
    }
}

export const getBySlug = async (req, res) => {
    try {
        const website = await Website.findOne({slug: req.params.slug, user: req.user._id});

        if(!website) {
            return res.status(404).json({error: 'Website not found'});
        }
        
        res.status(200).json(website);
    } catch (error) {
        console.error('Error fetching website by slug:', error);
        res.status(500).json({ error: 'Failed to fetch website by slug' });
    }
}