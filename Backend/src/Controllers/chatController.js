const chatModel = require("../model/chat.model");
const messageModel = require("../model/message.model")


async function createChat(req, res) {
    const { title } = req.body;

    const user = req.user

    const chat = await chatModel.create({
        user: user._id,
        title: title
    });

    res.status(200).json({
        message: "Chat created sucessfully",
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }
    });
}

async function fetchChats(req, res) {
    const user = req.user;

    const chats = await chatModel.find({ user: user._id });

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats: chats.map(chat => ({
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }))
    });
};


async function getmessages(req, res) {
    chatId = req.params.id;

    const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 })

    res.status(200).json({
        message: "Message retrieved sucessully",
        message: messages
    })
}




module.exports = { createChat, fetchChats, getmessages }