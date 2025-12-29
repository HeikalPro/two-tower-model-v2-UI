# Deployment Guide - Accessing from Outside

## Problem: Can't access website from external IP (34.203.221.132:3000)

### Step 1: Verify Server is Running

On your cloud instance, make sure the dev server is running:
```bash
npm run dev
```

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: http://0.0.0.0:3000/
```

### Step 2: Configure Cloud Security Group (AWS EC2)

If you're using **AWS EC2**, you need to open port 3000 in the Security Group:

1. Go to **AWS Console** → **EC2** → **Instances**
2. Select your instance (the one with IP 34.203.221.132)
3. Click on the **Security** tab
4. Click on the **Security group** link
5. Click **Edit inbound rules**
6. Click **Add rule**:
   - **Type**: Custom TCP
   - **Port range**: 3000
   - **Source**: 0.0.0.0/0 (for public access) or your specific IP
   - **Description**: Vite dev server
7. Click **Save rules**

### Step 3: Check Instance Firewall (Linux)

If your instance is Linux, check the firewall:

**Ubuntu/Debian:**
```bash
# Check if ufw is active
sudo ufw status

# If active, allow port 3000
sudo ufw allow 3000/tcp
sudo ufw reload
```

**CentOS/RHEL:**
```bash
# Check firewall status
sudo firewall-cmd --list-all

# Allow port 3000
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### Step 4: Verify Server Configuration

Make sure `vite.config.js` has:
```js
server: {
  host: '0.0.0.0', // This is already configured
  port: 3000,
}
```

### Step 5: Test Connection

From your local machine, test if the port is open:
```bash
# Windows PowerShell
Test-NetConnection -ComputerName 34.203.221.132 -Port 3000

# Or use telnet
telnet 34.203.221.132 3000
```

### Step 6: Check Server Logs

On the cloud instance, check if requests are reaching the server. You should see connection attempts in the Vite dev server logs.

## Alternative: Use a Production Build

For better performance and security, consider building for production:

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Serve with a production server:**
   ```bash
   # Install a simple HTTP server
   npm install -g serve
   
   # Serve the built files
   serve -s dist -l 3000
   ```

   Or use nginx:
   ```bash
   # Install nginx
   sudo apt-get install nginx
   
   # Configure nginx to serve your app
   # Edit /etc/nginx/sites-available/default
   ```

## Quick Checklist

- [ ] Server is running (`npm run dev`)
- [ ] Vite config has `host: '0.0.0.0'`
- [ ] Security Group allows port 3000 (AWS)
- [ ] Instance firewall allows port 3000 (Linux)
- [ ] Can access from instance itself: `curl http://localhost:3000`
- [ ] Can access from instance using private IP: `curl http://PRIVATE_IP:3000`

## Troubleshooting Commands

**On the cloud instance:**
```bash
# Check if port 3000 is listening
netstat -tuln | grep 3000
# or
ss -tuln | grep 3000

# Check if process is running
ps aux | grep vite

# Test local connection
curl http://localhost:3000
curl http://0.0.0.0:3000
```

**From your local machine:**
```bash
# Test if port is reachable
telnet 34.203.221.132 3000
# or
nc -zv 34.203.221.132 3000
```

## Backend API Configuration

The frontend automatically detects the host and connects to the API on port 8000. Make sure:

### 1. Backend API is Running

Your backend API should be running on port 8000 on the cloud instance:
```bash
# Make sure your backend is running
# It should listen on 0.0.0.0:8000 (not just localhost:8000)
```

### 2. Open Port 8000 in Security Group

Just like port 3000, you need to open port 8000:

1. Go to **AWS Console** → **EC2** → **Instances**
2. Select your instance
3. Click **Security** tab → **Security group** → **Edit inbound rules**
4. Add rule:
   - **Type**: Custom TCP
   - **Port range**: 8000
   - **Source**: 0.0.0.0/0 (or your specific IP)
   - **Description**: Backend API
5. Click **Save rules**

### 3. Configure Backend to Listen on 0.0.0.0

Your backend server must be configured to listen on all interfaces, not just localhost:

**Example for Python/FastAPI:**
```python
uvicorn.run(app, host="0.0.0.0", port=8000)
```

**Example for Node.js/Express:**
```javascript
app.listen(8000, '0.0.0.0', () => {
  console.log('Server running on 0.0.0.0:8000');
});
```

### 4. Test Backend API

From your local machine, test if the API is accessible:
```bash
curl http://34.203.221.132:8000/retrieve
```

Or test from the cloud instance:
```bash
curl http://localhost:8000/retrieve
```

### 5. Check Backend Logs

When you click "Get Recommendations" in the frontend, check your backend logs to see if requests are reaching it. If not, verify:
- Backend is running
- Port 8000 is open in security group
- Backend is listening on 0.0.0.0:8000
- No firewall blocking port 8000 on the instance

