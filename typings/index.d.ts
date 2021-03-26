import { Client, EmojiResolvable, Message } from "discord.js";

declare global {
    namespace RB {
        // Interfaces
        interface CommandConfig {
            name: string,
            aliases: string[],
            permissions: Permission[],
            clientPermissions: Permission[],
            group: CommandGroup,
            description: string,
            usage: string
        }

        interface Command {
            config: CommandConfig,
            run: (client: Client, message: Message, args: string[]) => void
        }

        interface GroupData {
            id: string,
            name: string,
            icon: EmojiResolvable
        }

        interface StatusData {
            name: string,
            type: PresenceType,
            status: PresenceStatus
        }

        interface Event {
            config: {
                name: DiscordEvent
            }
        }

        interface MessageEvent extends Event {
            run: (client: Client, message: Message) => void;
        }

        interface ReadyEvent extends Event {
            run: (client: Client) => void;
        }

        // Types
        type CommandGroup =
            | 'gen'
            | 'mod'
            | 'util'
            | 'misc'

        type PresenceType = 
            | 'PLAYING'
            | 'WATCHING'
            | 'LISTENING'
            | 'COMPETING'
            | 'STREAMING'
        
        type PresenceStatus = 
            | 'online'
            | 'away'
            | 'dnd'
            | 'invisible'
        
        type Permission =
            | 'CREATE_INSTANT_INVITE'
            | 'KICK_MEMBERS'
            | 'BAN_MEMBERS'
            | 'ADMINISTRATOR'
            | 'MANAGE_CHANNELS'
            | 'MANAGE_GUILD'
            | 'ADD_REACTIONS'
            | 'VIEW_AUDIT_LOG'
            | 'PRIORITY_SPEAKER'
            | 'STREAM'
            | 'VIEW_CHANNEL'
            | 'SEND_MESSAGES'
            | 'SEND_TTS_MESSAGES'
            | 'MANAGE_MESSAGES'
            | 'EMBED_LINKS'
            | 'ATTACH_FILES'
            | 'READ_MESSAGE_HISTORY'
            | 'MENTION_EVERYONE'
            | 'USE_EXTERNAL_EMOJIS'
            | 'VIEW_GUILD_INSIGHTS'
            | 'CONNECT'
            | 'SPEAK'
            | 'MUTE_MEMBERS'
            | 'DEAFEN_MEMBERS'
            | 'MOVE_MEMBERS'
            | 'USE_VAD'
            | 'CHANGE_NICKNAME'
            | 'MANAGE_NICKNAMES'
            | 'MANAGE_ROLES'
            | 'MANAGE_WEBHOOKS'
            | 'MANAGE_EMOJIS';

        type DiscordEvent = 
            | 'channelCreate'
            | 'channelDelete'
            | 'channelPinsUpdate'
            | 'channelUpdate'
            | 'debug'
            | 'emojiCreate'
            | 'emojiDelete'
            | 'emojiUpdate'
            | 'error'
            | 'guildBanAdd'
            | 'guildBanRemove'
            | 'guildCreate'
            | 'guildDelete'
            | 'guildIntegrationUpdate'
            | 'guildMemberAdd'
            | 'guildMemberAvailable'
            | 'guildMemberRemove'
            | 'guildMembersChunk'
            | 'guildMemberSpeaking'
            | 'guildMemberUpdate'
            | 'guildUnavailable'
            | 'guildUpdate'
            | 'invalidated'
            | 'inviteCreate'
            | 'inviteDelete'
            | 'message'
            | 'messageDelete'
            | 'messageDeleteBulk'
            | 'messageReactionAdd'
            | 'messageReactionRemove'
            | 'messageReactionRemoveAll'
            | 'messageReactionRemoveEmoji'
            | 'messageUpdate'
            | 'presenceUpdate'
            | 'rateLimit'
            | 'raw'
            | 'ready'
            | 'roleCreate'
            | 'roleDelete'
            | 'roleUpdate'
            | 'shardDisconnect'
            | 'shardError'
            | 'shardReady'
            | 'shardReconnecting'
            | 'shardResume'
            | 'typingStart'
            | 'userUpdate'
            | 'voiceStateUpdate'
            | 'warn'
            | 'webhookUpdate';

        type RawDiscordEvent = 
            | 'READY'
            | 'RESUMED'
            | 'GUILD_CREATE'
            | 'GUILD_DELETE'
            | 'GUILD_UPDATE'
            | 'INVITE_CREATE'
            | 'INVITE_DELETE'
            | 'GUILD_MEMBER_ADD'
            | 'GUILD_MEMBER_REMOVE'
            | 'GUILD_MEMBER_UPDATE'
            | 'GUILD_MEMBERS_CHUNK'
            | 'GUILD_ROLE_CREATE'
            | 'GUILD_ROLE_DELETE'
            | 'GUILD_ROLE_UPDATE'
            | 'GUILD_BAN_ADD'
            | 'GUILD_BAN_REMOVE'
            | 'GUILD_EMOJIS_UPDATE'
            | 'GUILD_INTEGRATIONS_UPDATE'
            | 'CHANNEL_CREATE'
            | 'CHANNEL_DELETE'
            | 'CHANNEL_UPDATE'
            | 'CHANNEL_PINS_UPDATE'
            | 'MESSAGE_CREATE'
            | 'MESSAGE_DELETE'
            | 'MESSAGE_UPDATE'
            | 'MESSAGE_DELETE_BULK'
            | 'MESSAGE_REACTION_ADD'
            | 'MESSAGE_REACTION_REMOVE'
            | 'MESSAGE_REACTION_REMOVE_ALL'
            | 'MESSAGE_REACTION_REMOVE_EMOJI'
            | 'USER_UPDATE'
            | 'PRESENCE_UPDATE'
            | 'TYPING_START'
            | 'VOICE_STATE_UPDATE'
            | 'VOICE_SERVER_UPDATE'
            | 'WEBHOOKS_UPDATE';
    }
}