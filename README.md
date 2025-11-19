# MCP Roo - Proofessor AI Agent MCP Server

An MCP (Model Context Protocol) server that allows other AI agents to communicate with Proofessor, an expert AI agent specialized in code explanation, technical concepts, debugging, and architecture analysis.

## Overview

This MCP server provides a standardized interface for AI agents to ask questions and get expert explanations from Proofessor. It's designed to work with Roo Cloud and can be easily integrated into any MCP-compatible environment.

## Features

The server provides five specialized tools for interacting with Proofessor:

### 1. **ask_proofessor**
Ask Proofessor any question about code, architecture, debugging, or technical concepts.

**Parameters:**
- `question` (required): Your question for Proofessor
- `context` (optional): Additional context like code snippets or project details

**Example:**
```json
{
  "question": "What are the benefits of using TypeScript over JavaScript?",
  "context": "Working on a large-scale web application with multiple developers"
}
```

### 2. **explain_code**
Request detailed explanations of how specific code works.

**Parameters:**
- `code` (required): The code snippet to explain
- `language` (optional): Programming language (e.g., 'javascript', 'python')
- `focus` (optional): Specific aspect to focus on (e.g., 'performance', 'security')

**Example:**
```json
{
  "code": "const debounce = (fn, delay) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }",
  "language": "javascript",
  "focus": "performance"
}
```

### 3. **analyze_architecture**
Get architectural analysis and recommendations.

**Parameters:**
- `description` (required): Description of the architecture or system design
- `concerns` (optional): Specific concerns (e.g., 'scalability', 'security')

**Example:**
```json
{
  "description": "Microservices architecture with event-driven communication using message queues",
  "concerns": "scalability and fault tolerance"
}
```

### 4. **debug_help**
Get assistance with debugging issues and understanding errors.

**Parameters:**
- `error_message` (required): The error message or problem description
- `code_context` (optional): Relevant code related to the error
- `attempted_solutions` (optional): Solutions already tried

**Example:**
```json
{
  "error_message": "TypeError: Cannot read property 'map' of undefined",
  "code_context": "const items = data.items.map(item => item.name);",
  "attempted_solutions": "Checked if data exists, but still getting the error"
}
```

### 5. **best_practices**
Ask about best practices for specific technologies or patterns.

**Parameters:**
- `topic` (required): The technology or pattern to get best practices for
- `context` (optional): Specific use case or context

**Example:**
```json
{
  "topic": "React hooks",
  "context": "Building a complex form with multiple validation steps"
}
```

## Installation

### Using npx (Recommended)

The easiest way to use this server is with npx:

```bash
npx @mtuckerb/mcp-roo
```

### Global Installation

```bash
npm install -g @mtuckerb/mcp-roo
```

### Local Installation

```bash
npm install @mtuckerb/mcp-roo
```

## Configuration

### For Roo Cloud

Add to your MCP settings file (`~/.roo/mcp_settings.json` or similar):

```json
{
  "mcpServers": {
    "proofessor": {
      "command": "npx",
      "args": ["@mtuckerb/mcp-roo"],
      "disabled": false,
      "alwaysAllow": [],
      "disabledTools": []
    }
  }
}
```

### For Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or the equivalent on your OS:

```json
{
  "mcpServers": {
    "proofessor": {
      "command": "npx",
      "args": ["@mtuckerb/mcp-roo"]
    }
  }
}
```

### Using Local Build

If you've cloned and built the repository locally:

```json
{
  "mcpServers": {
    "proofessor": {
      "command": "node",
      "args": ["/path/to/mcp_roo/build/index.js"]
    }
  }
}
```

## Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mtuckerb/mcp_roo.git
cd mcp_roo
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

### Project Structure

```
mcp_roo/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript output
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development
- `npm run prepare` - Automatically runs on install

## Usage Examples

### From Another AI Agent

When configured in an MCP-compatible environment, other agents can use these tools:

```javascript
// Ask a general question
await use_mcp_tool("proofessor", "ask_proofessor", {
  question: "What is the difference between async/await and Promises?",
  context: "I'm refactoring callback-based code"
});

// Get code explanation
await use_mcp_tool("proofessor", "explain_code", {
  code: "function* fibonacci() { let [a, b] = [0, 1]; while (true) { yield a; [a, b] = [b, a + b]; } }",
  language: "javascript"
});

// Analyze architecture
await use_mcp_tool("proofessor", "analyze_architecture", {
  description: "REST API with JWT authentication and PostgreSQL database",
  concerns: "security and performance"
});
```

### Testing Locally

You can test the server using the MCP inspector or by integrating it into your development environment.

## How It Works

This MCP server acts as a bridge between other AI agents and Proofessor's expertise. When a tool is called:

1. The agent sends a request through the MCP protocol
2. The server receives and validates the request
3. The request is formatted for Proofessor's analysis
4. A response is generated and returned through MCP

**Note:** The current implementation provides simulated responses. In a production environment, this would connect to Proofessor's actual AI system for real-time expert analysis.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

mtuckerb

## Links

- [GitHub Repository](https://github.com/mtuckerb/mcp_roo)
- [Issue Tracker](https://github.com/mtuckerb/mcp_roo/issues)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)

## Changelog

### 1.0.0 (2025-11-19)
- Initial release
- Five specialized tools for interacting with Proofessor
- Support for npx usage
- Comprehensive documentation