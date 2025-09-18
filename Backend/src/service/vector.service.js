// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINCECONE_API_KEY });

// Create a dense index with integrated embedding

const gptCloneIndex = pc.Index('gpt-clone')

async function createMemory({ vectors, metadata, messageId }) {
    await gptCloneIndex.upsert([{
        id: messageId,
        values: vectors,
        metadata
    }])
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
    const data = await gptCloneIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? { metadata } : undefined,
        includeMetadata: true
    })
    return data
}

module.exports = { createMemory, queryMemory }