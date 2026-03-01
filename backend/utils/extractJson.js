const extractJson = async (text) => {
    if(!text) return null;

    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1 || firstBrace > lastBrace) {
        throw new Error('No valid JSON found in the response.');
    }

    const jsonString = cleaned.substring(firstBrace, lastBrace + 1);

    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse JSON from the response.');
    }
}

export default extractJson;