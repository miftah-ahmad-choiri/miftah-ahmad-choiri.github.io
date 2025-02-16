# AS400 Cheatsheets

Here’s a collection of common **IBM AS/400 (IBM i) commands** and a **cheat sheet** to help you navigate the system efficiently.

---

## 📌 **Basic AS/400 Commands Cheat Sheet**
### **1️⃣ System Navigation**
| Command          | Description |
|-----------------|-------------|
| `SIGNOFF`       | Log off from AS/400 |
| `WRKACTJOB`     | Display active jobs |
| `DSPJOB`        | Show job details |
| `DSPMSG`        | Display messages |
| `DSPLOG`        | View system log |
| `WRKSPLF`       | Work with spool files (print jobs) |
| `WRKOUTQ`       | Work with output queues |
| `WRKUSRJOB`     | Work with user jobs |
| `WRKUSRPRF`     | Work with user profiles |
| `WRKSBMJOB`     | Work with submitted jobs |
| `WRKJOBSCDE`    | Work with job scheduler |
| `WRKSYSSTS`     | Display system status |

---

### **2️⃣ User and Security Commands**
| Command          | Description |
|-----------------|-------------|
| `DSPUSRPRF`     | Display user profile details |
| `CHGUSRPRF`     | Change user profile |
| `CRTUSRPRF`     | Create a new user profile |
| `DLTUSRPRF`     | Delete a user profile |
| `WRKOBJOWN`     | Work with objects owned by a user |
| `WRKCFGSTS *DEV` | Work with configured devices |
| `WRKCFGSTS *CTL` | Work with configured controllers |

---

### **3️⃣ File and Object Management**
| Command          | Description |
|-----------------|-------------|
| `WRKLIB`        | Work with libraries |
| `WRKOBJ`        | Work with objects |
| `WRKMBRPDM`     | Work with members in PDM |
| `DSPFD`         | Display file description |
| `DSPFFD`        | Display file field descriptions |
| `CPYF`          | Copy a file |
| `CRTPF`         | Create a physical file |
| `CRTDDMF`       | Create a Distributed Data Management file |
| `RNMOBJ`        | Rename an object |
| `DLTF`          | Delete a file |
| `CHKOBJ`        | Check if an object exists |
| `WRKLNK`        | Work with IFS (Integrated File System) objects |

---

### **4️⃣ Job Management**
| Command          | Description |
|-----------------|-------------|
| `WRKACTJOB`     | Work with active jobs |
| `WRKJOB`        | Work with jobs |
| `ENDJOB`        | End a job |
| `ENDJOBABN`     | End a job abnormally |
| `SBMJOB`        | Submit a batch job |
| `HLDJOB`        | Hold a job |
| `RLSJOB`        | Release a job |
| `CHGJOB`        | Change job attributes |
| `DSPJOBLOG`     | Display job log |
| `DSPMSG`        | Display messages |

---

### **5️⃣ Work with Queries and SQL**
| Command          | Description |
|-----------------|-------------|
| `STRSQL`        | Start interactive SQL |
| `RUNQRY`        | Run a query |
| `WRKQRY`        | Work with query |
| `CRTQMQRY`      | Create a QM query |
| `DSPDBR`        | Display database relations |

---

### **6️⃣ Backup & Restore**
| Command          | Description |
|-----------------|-------------|
| `SAVLIB`        | Save a library |
| `SAVOBJ`        | Save an object |
| `SAVCHGOBJ`     | Save changed objects |
| `RSTLIB`        | Restore a library |
| `RSTOBJ`        | Restore an object |
| `SAVSYS`        | Save the entire system |
| `SAVDLO`        | Save document library objects |
| `RSTLIB`        | Restore a library |
| `RSTOBJ`        | Restore an object |

---

### **7️⃣ Printing and Spool Files**
| Command          | Description |
|-----------------|-------------|
| `WRKSPLF`       | Work with spool files |
| `DSPJOBLOG`     | Display job logs |
| `DUPPRT`        | Duplicate print job |
| `DLTJOB`        | Delete a job |
| `WRKOUTQ`       | Work with output queues |

---

### **8️⃣ Device and System Configuration**
| Command          | Description |
|-----------------|-------------|
| `WRKCFGSTS`     | Work with configuration status |
| `CHGDEV`        | Change device attributes |
| `WRKDEVD`       | Work with device descriptions |
| `DSPHDWRSC`     | Display hardware resources |
| `WRKHDWRSC`     | Work with hardware resources |

---

### **9️⃣ Message Handling**
| Command          | Description |
|-----------------|-------------|
| `SNDMSG`        | Send a message to a user or workstation |
| `SNDUSRMSG`     | Send a user message |
| `DSPMSG`        | Display messages |
| `WRKMSGQ`       | Work with message queues |
| `DSPJOBLOG`     | Display job log messages |

---

## 📌 **AS/400 Shortcut Keys**
| Shortcut | Description |
|----------|-------------|
| **F3**   | Exit program |
| **F4**   | Prompt for command parameters |
| **F5**   | Refresh screen |
| **F6**   | Create new record |
| **F9**   | Retrieve previous command |
| **F10**  | Display additional information |
| **F12**  | Cancel & return to previous menu |
| **F23**  | More options |
| **Page Up/Down** | Scroll through list |

---

## 📌 **Common Query Commands**
| Command | Description |
|---------|-------------|
| `SELECT * FROM LIBRARY/FILE` | Retrieve all records |
| `INSERT INTO LIBRARY/FILE VALUES(...)` | Insert a new record |
| `UPDATE LIBRARY/FILE SET FIELD='VALUE' WHERE CONDITION` | Update records |
| `DELETE FROM LIBRARY/FILE WHERE CONDITION` | Delete records |

---

This cheat sheet covers the most frequently used AS/400 commands for **system administration, user management, file handling, jobs, security, SQL queries, and backups**. Let me know if you need more specific commands or examples! 🚀