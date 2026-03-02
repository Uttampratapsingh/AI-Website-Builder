import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { deployWebsite } from '../../service/deployWebsite';
import { Check, Rocket, Share2 } from 'lucide-react';
import {motion} from 'motion/react';

const DeployButton = ({w}) => {
    const [copiedLink, setCopiedLink] = useState('');


    const handleCopyLink = (e, link) => {
        e.stopPropagation(); 
        e.preventDefault();
        console.log('Copying link:', link); // Debug log
        navigator.clipboard.writeText(link)
      .then(() => {
        setCopiedLink(link);
        setTimeout(() => setCopiedLink(''), 2000); // Reset after 2 seconds
        toast.success("Link copied to clipboard!");
      })

      .catch((err) => {
        console.error('Failed to copy link: ', err);
        toast.error("Failed to copy link");
      });
    }


    const handleDeploy = async (e,id) => {
        e.stopPropagation(); 
        e.preventDefault();
        console.log('Deploying website with id:', id); // Debug log
        try {
        const url = await deployWebsite(id);
        window.open(url, "_blank");
        } catch (error) {
        console.error(error);
        toast.error("Failed to deploy website");
        }finally {
            window.location.reload();   // ✅ Refresh dashboard
        }
    };


  return (
  <>
    {!w.deployed ? (
        <button
            className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition"
            onClick={(e) => handleDeploy(e,w._id)}
        >
            <Rocket size={18} />
            Deploy
        </button>
        ) : (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleCopyLink(e,w.deployUrl)}
            className={`
            mt-auto flex items-center justify-center gap-2
            px-4 py-2 rounded-xl text-sm font-medium
            transition-all border
            ${
                copiedLink === w.deployUrl
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-white/10 hover:bg-white/20 border-white/10"
            }
            `}
        >                      
            {copiedLink === w.deployUrl ? <Check size={18} /> : <Share2 size={18} />}
            {copiedLink === w.deployUrl ? "Copied!" : "Share Link"}
        </motion.button>
        )}
  </>
  )
}

export default DeployButton